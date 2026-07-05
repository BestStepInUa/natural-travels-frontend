'use client';

import { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { nextServer } from '@/lib/api/api';
import css from './AddStoryForm.module.css';

const CATEGORIES = [
  { id: 'd3b07384-d113-4bf6-a5db-829d4c28f081', label: 'Подорожі' },
  { id: 'a6c0241a-82ef-4573-8d07-2936a287c805', label: 'Природа' },
  { id: 'e2b173c3-63b7-4c74-a0a1-7389a9f2bf4d', label: 'Культура' },
  { id: 'f8a4c28f-723a-48d6-953e-289547d2f83a', label: 'Активний відпочинок' },
];

interface StoryFormValues {
  title: string;
  text: string;
  category: string;
  coverImage: File | null;
}

const initialValues: StoryFormValues = {
  title: '',
  text: '',
  category: '',
  coverImage: null,
};


const validationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required('Введіть заголовок історії')
    .min(2, 'Заголовок має містити щонайменше 2 символи')
    .max(40, 'Заголовок має містити не більше 40 символів'),
  text: Yup.string()
    .trim()
    .required('Введіть текст історії')
    .min(12, 'Текст історії має містити щонайменше 12 символів')
    .max(3000, 'Текст історії має містити не більше 3000 символів'),
  category: Yup.string()
    .required('Вибір категорії є обов’язковим')
    .matches(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      'Категорія має містити валідний унікальний ідентифікатор (UID)'
    ),
  coverImage: Yup.mixed()
    .required('Завантаження зображення є обов’язковим')
    .test('fileSize', 'Максимальний розмір зображення — 1MB', (value) => {
      if (!value) return false;
      return (value as File).size <= 1024 * 1024;
    }),
});

export default function AddStoryForm() {
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

  const handleCancel = (
    resetForm: () => void
  ) => {
    resetForm();
    setImagePreview(null);
    const fileInput = document.getElementById('cover-image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (
    values: StoryFormValues
  ) => {
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

  return (
    <>
      {toastMessage && (
        <div className={css.toast}>
          <span className={css.toastIcon}>⚠️</span>
          <span className={css.toastText}>{toastMessage}</span>
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          resetForm,
        }) => {

          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            const textarea = textareaRef.current;
            if (textarea) {
              textarea.style.height = 'auto';
              textarea.style.height = `${textarea.scrollHeight}px`;
            }
          }, [values.text]);


          // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
              if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
                setFieldTouched('category', true);
              }
            }
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
              document.removeEventListener('mousedown', handleClickOutside);
            };
          }, [setFieldTouched]);

          const handleCategorySelect = (id: string) => {
            setFieldValue('category', id);
            setIsDropdownOpen(false);
            setFieldTouched('category', true);
          };

          const selectedCategoryLabel =
            CATEGORIES.find((cat) => cat.id === values.category)?.label || 'Категорія';


          const hasEmptyFields =
            !values.title.trim() ||
            !values.text.trim() ||
            !values.category ||
            !values.coverImage;

          const isSaveDisabled = isSubmitting || !isValid || hasEmptyFields;

          return (
            <Form className={css.form}>
    
              <div className={css.fieldWrapper}>
                <span className={css.label}>Обкладинка статті</span>

                <input
                  type="file"
                  id="cover-image"
                  accept="image/*"
                  className="visually-hidden"
                  onChange={(e) => handleImageChange(e, setFieldValue, setFieldTouched)}
                />

                <label
                  htmlFor="cover-image"
                  className={`${css.imagePlaceholder} ${
                    touched.coverImage && errors.coverImage ? css.imagePlaceholderError : ''
                  }`}
                  aria-label="Завантажити обкладинку статті"
                >
                  {imagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imagePreview} alt="Обкладинка статті" className={css.previewImage} />
                  ) : (
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 335 223"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="335" height="223" rx="12" fill="#E0E0E0" />
                      <g transform="translate(131.5, 75.5)">
                        <rect width="72" height="72" rx="16" fill="#B3B3B3" />
                        <circle cx="26" cy="26" r="4.5" fill="#E0E0E0" />
                        <path
                          d="M17 53.5 L31.5 35 L42.5 46.5 L50.5 31.5 L57.5 40 L57.5 53.5 Z"
                          fill="#E0E0E0"
                        />
                      </g>
                    </svg>
                  )}
                </label>

                <label htmlFor="cover-image" className={css.uploadButton}>
                  Завантажити фото
                </label>

                <ErrorMessage name="coverImage" component="span" className={css.error} />
              </div>


              <div className={css.fieldWrapper}>
                <label htmlFor="story-title" className={css.label}>
                  Заголовок
                </label>
                <Field
                  type="text"
                  id="story-title"
                  name="title"
                  placeholder="Введіть заголовок історії"
                  className={`${css.input} ${
                    touched.title && errors.title ? css.inputError : ''
                  }`}
                />
                <ErrorMessage name="title" component="span" className={css.error} />
              </div>


              <div className={css.fieldWrapper} ref={dropdownRef}>
                <span className={css.label}>Категорія</span>
                <div className={css.selectContainer}>
                  <button
                    type="button"
                    className={`${css.selectToggle} ${isDropdownOpen ? css.selectToggleActive : ''} ${
                      touched.category && errors.category ? css.inputError : ''
                    }`}
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                  >
                    <span>{selectedCategoryLabel}</span>
                    <span className={`${css.selectChevron} ${isDropdownOpen ? css.selectChevronOpen : ''}`}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                  {isDropdownOpen && (
                    <ul className={css.optionsList}>
                      {CATEGORIES.map((cat) => (
                        <li
                          key={cat.id}
                          className={`${css.optionItem} ${values.category === cat.id ? css.optionItemActive : ''}`}
                          onClick={() => handleCategorySelect(cat.id)}
                        >
                          {cat.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <ErrorMessage name="category" component="span" className={css.error} />
              </div>


              <div className={css.fieldWrapper}>
                <label htmlFor="story-text" className={css.label}>
                  Текст історії
                </label>
                <Field
                  as="textarea"
                  id="story-text"
                  name="text"
                  innerRef={textareaRef}
                  placeholder="Ваша історія тут"
                  className={`${css.textarea} ${
                    touched.text && errors.text ? css.inputError : ''
                  }`}
                />
                <ErrorMessage name="text" component="span" className={css.error} />
              </div>


              <div className={css.buttonContainer}>
                <button
                  type="button"
                  onClick={() => handleCancel(resetForm)}
                  className={css.cancelButton}
                >
                  Відмінити
                </button>
                <button
                  type="submit"
                  disabled={isSaveDisabled}
                  className={css.saveButton}
                >
                  {isSubmitting ? <div className={css.spinner} /> : 'Зберегти'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
