'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { nextServer } from '@/lib/api/api';
import { StoryFormValues } from './validation';
import { getCategories, BackendCategory } from '@/lib/api/storiesApi';
import { useEffect } from 'react';
interface SelectCategory {
  id: string;
  label: string;
}


export default function useAddStoryForm() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [categories, setCategories] = useState<SelectCategory[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 5000);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        const mappedCategories = data.map((cat: BackendCategory) => ({
          id: cat._id,
          label: cat.category,
        }));
        setCategories(mappedCategories);
      } catch (error) {
        console.error('Помилка завантаження категорій:', error);
        showToast('Не вдалося завантажити категорії з сервера.');
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);



  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFieldValue('coverImage', file);
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }

      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageDelete = (
    setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void
  ) => {
    setFieldValue('coverImage', null);
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    const fileInput = document.getElementById('cover-image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleCancel = (resetForm: () => void) => {
    resetForm();

    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(null);
    const fileInput = document.getElementById('cover-image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (values: StoryFormValues) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title.trim());
      formData.append('article', values.text.trim());
      formData.append('category', values.category);
      if (values.coverImage) {
        formData.append('img', values.coverImage);
      }

      const res = await nextServer.post<{ id?: string; _id?: string }>('/stories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const storyId = res.data.id || res.data._id;

      if (storyId) {
        router.push(`/stories/${storyId}`);
      } else {
        router.push('/');
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Сталася помилка при відправці запиту на створення історії.';
      showToast(errorMessage);
    }
  };

  return {
    isDropdownOpen,
    setIsDropdownOpen,
    imagePreview,
    setImagePreview,
    toastMessage,
    showToast,
    categories,
    isLoadingCategories,
    dropdownRef,
    textareaRef,
    handleImageChange,
    handleImageDelete,
    handleCancel,
    handleSubmit,
  };
}
