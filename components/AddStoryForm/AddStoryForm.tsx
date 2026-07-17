'use client';

import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import css from './AddStoryForm.module.css';
import ToastAlert from './ToastAlert';
import ImageUploader from './ImageUploader';
import InputField from './InputField';
import CategorySelect from './CategorySelect';
import AutoResizingTextarea from './AutoResizingTextarea';
import FormActions from './FormActions';
import useAddStoryForm from './useAddStoryForm';
import { initialValues, validationSchema } from './validation';
import { ConfirmModal } from '@/components/ConfirmModal/ConfirmModal';

export default function AddStoryForm() {
  const {
    isDropdownOpen,
    setIsDropdownOpen,
    imagePreview,
    toastMessage,
    categories,
    isLoadingCategories,
    dropdownRef,
    textareaRef,
    handleImageChange,
    handleImageDelete,
    handleCancel,
    handleSubmit,
  } = useAddStoryForm();

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [resetFormCallback, setResetFormCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, setIsDropdownOpen]);

  return (
    <>
      <ToastAlert message={toastMessage} />

      <ConfirmModal
        isOpen={isCancelModalOpen}
        title="Скасувати створення?"
        confirmButtonText="Так, очистити"
        cancelButtonText="Ні, продовжити"
        onConfirm={() => {
          if (resetFormCallback) {
            handleCancel(resetFormCallback);
          }
          setIsCancelModalOpen(false);
          setResetFormCallback(null);
        }}
        onCancel={() => {
          setIsCancelModalOpen(false);
          setResetFormCallback(null);
        }}
      >
        Ви дійсно хочете відмінити створення історії? Всі незбережені зміни будуть втрачені.
      </ConfirmModal>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(formikProps) => {
          const {
            values,
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            resetForm,
            dirty,
          } = formikProps;

          const handleCategorySelect = (id: string) => {
            setFieldValue('category', id);
            setIsDropdownOpen(false);
          };

          const isSaveDisabled = isSubmitting || isLoadingCategories;

          return (
            <Form className={css.form}>
              <ImageUploader
                imagePreview={imagePreview}
                error={errors.coverImage}
                touched={touched.coverImage}
                onImageChange={(e) => handleImageChange(e, setFieldValue)}
                onImageDelete={() => handleImageDelete(setFieldValue)}
              />

              <InputField
                label="Заголовок"
                id="story-title"
                name="title"
                placeholder="Введіть заголовок історії"
                error={errors.title}
                touched={touched.title}
              />

              <CategorySelect
                categories={categories}
                selectedValue={values.category}
                error={errors.category}
                touched={touched.category}
                isDropdownOpen={isDropdownOpen}
                setIsDropdownOpen={setIsDropdownOpen}
                dropdownRef={dropdownRef}
                onCategorySelect={handleCategorySelect}
              />

              <AutoResizingTextarea
                label="Текст історії"
                id="story-text"
                name="text"
                placeholder="Ваша історія тут"
                error={errors.text}
                touched={touched.text}
                textareaRef={textareaRef}
              />

              <FormActions
                isSaveDisabled={isSaveDisabled}
                isSubmitting={isSubmitting}
                onCancel={() => {
                  if (dirty) {
                    setResetFormCallback(() => resetForm);
                    setIsCancelModalOpen(true);
                  } else {
                    handleCancel(resetForm);
                  }
                }}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
