'use client';
import { useEffect } from 'react';
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
    handleCancel,
    handleSubmit,
  } = useAddStoryForm();


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

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => {
          const {
            values,
            errors,
            touched,
            isValid,
            isSubmitting,
            setFieldValue,
            setFieldTouched,
            resetForm,
          } = formikProps;

          const textarea = textareaRef.current;
          if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
          }


          

          const handleCategorySelect = (id: string) => {
            setFieldValue('category', id);
            setIsDropdownOpen(false);
            setFieldTouched('category', true);
          };

          const hasEmptyFields =
            !values.title.trim() ||
            !values.text.trim() ||
            !values.category ||
            !values.coverImage;

          const isSaveDisabled = isSubmitting || !isValid || hasEmptyFields || isLoadingCategories;

          return (
            <Form className={css.form}>

              <ImageUploader
                imagePreview={imagePreview}
                error={errors.coverImage}
                touched={touched.coverImage}
                onImageChange={(e) => handleImageChange(e, setFieldValue, setFieldTouched)}
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
                onCancel={() => handleCancel(resetForm)}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
