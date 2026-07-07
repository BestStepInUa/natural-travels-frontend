'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { nextServer } from '@/lib/api/api';
import { StoryFormValues } from './validation';

export default function useAddStoryForm() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void,
    setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void
  ) => {
    setFieldTouched('coverImage', true);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFieldValue('coverImage', file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCancel = (resetForm: () => void) => {
    resetForm();
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

      const res = await nextServer.post<{ id: string }>('/stories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data && res.data.id) {
        router.push(`/stories/${res.data.id}`);
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
    dropdownRef,
    textareaRef,
    handleImageChange,
    handleCancel,
    handleSubmit,
  };
}
