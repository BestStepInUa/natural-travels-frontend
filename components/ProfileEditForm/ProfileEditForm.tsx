'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { isAxiosError } from 'axios';

import { useAuthStore } from '@/lib/store/authStore/authStore';
import { updateUserClient, updateAvatarClient } from '@/lib/api/clientApi';
import css from './ProfileEditForm.module.css';

const ValidationSchemaProfile = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ім'я повинно містити не менше 2 символів")
    .max(50, "Ім'я занадто довге")
    .required("Введіть ім'я"),
});

interface ProfileValues {
  name: string;
}

export default function ProfileEditForm() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl ?? '');
  const [error, setError] = useState('');

  if (!user) return null;

  const initialValues: ProfileValues = {
    name: user.name,
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (
    values: ProfileValues,
    formikHelpers: FormikHelpers<ProfileValues>
  ) => {
    setError('');

    try {
      let updatedUser = user;

      if (avatarFile) {
        const avatarUrl = await updateAvatarClient(avatarFile);
        updatedUser = { ...updatedUser, avatarUrl };
      }

      if (values.name !== user.name) {
        updatedUser = await updateUserClient({ name: values.name });
      }

      setUser(updatedUser);
      setAvatarFile(null);
      formikHelpers.resetForm({ values: { name: updatedUser.name } });
    } catch (error) {
      if (isAxiosError(error)) {
        const serverMessage = error.response?.data?.message;
        setError(serverMessage || 'Не вдалося зберегти зміни');
      } else {
        setError('Не вдалося зберегти зміни');
      }
    }
  };

  return (
    <div className={css.card}>
      <Formik
        validationSchema={ValidationSchemaProfile}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.avatarColumn}>
              <div className={css.avatarFrame}>
                <Image
                  src={
                    avatarPreview.includes('default-avatar') || !avatarPreview
                      ? '/my-avatar.png'
                      : avatarPreview
                  }
                  alt={user.name}
                  width={120}
                  height={120}
                  className={css.avatar}
                  priority
                />
                <label className={css.avatarBadge} aria-label="Змінити фото">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 8a2 2 0 012-2h1.5l1-1.5h7l1 1.5H18a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V8z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12.5"
                      r="3.2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className={css.avatarInput}
                  />
                </label>
              </div>
              <span className={css.avatarCaption}>Ваше фото</span>
            </div>

            <div className={css.trail} aria-hidden="true" />

            <div className={css.fieldsColumn}>
              <label className={css.label}>
                Ім&apos;я
                <Field
                  className={`${css.input} ${
                    errors.name && touched.name ? css.inputError : ''
                  }`}
                  type="text"
                  name="name"
                  placeholder="Ваше ім'я"
                />
                <div className={css.errorWrapper}>
                  <ErrorMessage
                    name="name"
                    component="span"
                    className={css.error}
                  />
                </div>
              </label>

              <button
                type="submit"
                className={css.button}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Збереження...' : 'Зберегти зміни'}
              </button>

              {error && <p className={css.errorAfterForm}>{error}</p>}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
