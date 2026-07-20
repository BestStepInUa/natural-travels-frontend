'use client';

import { register } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import css from './RegisterForm.module.css';
import { useAuthStore } from '@/lib/store/authStore/authStore';
import { isAxiosError } from 'axios';

const ValidationSchemaRegister = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Введіть ім'я користувача")
    .min(10, 'Імʼя повинно містити не менше 10 символів')
    .max(32, 'Імʼя не може перевищувати 32 символи'),

  email: Yup.string()
    .trim()
    .email('Введіть коректний email')
    .required('Введіть email для реєстрації')
    .max(64, 'Email не може перевищувати 64 символи'),

  password: Yup.string()
    .required('Введіть пароль')
    .min(8, 'Пароль повинен містити не менше 8 символів')
    .max(128, 'Пароль не може перевищувати 128 символів'),
});

interface RegisterValues {
  name: string;
  email: string;
  password: string;
}

const initialValues: RegisterValues = {
  name: '',
  email: '',
  password: '',
};

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser)
  const handleSubmit = async (
    values: RegisterValues,
    formikHelpers: FormikHelpers<RegisterValues>
  ) => {
    try {
      const user = await register(values);
      if (user) {
        setUser(user)
        formikHelpers.resetForm();
        router.push('/');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const serverMessage = error.response?.data?.response?.message;
        if(serverMessage === '"email" must be a valid email') {
          setError("Email не валідний");
          formikHelpers.setFieldError("email", "Email не валідний");
        }
        else {
                    setError("Email вже використовується");
          formikHelpers.setFieldError("email", "Email вже використовується");
        }
      }
    }
  };
  return (
    <section className={css.section}>
      <h1 className={css.registerH1}>Реєстрація</h1>
      <p className={css.textRegisterForm}>
        Раді вас бачити у спільноті мандрівників!
      </p>
      <Formik
        validationSchema={ValidationSchemaRegister}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, dirty, isValid }) => (
          <Form className={css.formRegister}>
            {/* Ім'я */}
            <label className={css.labelRegisterForm}>
              Імʼя та Прізвище*
              <Field
                type="text"
                name="name"
                className={`${css.inputRegisterForm} ${
                  errors.name && touched.name ? css.inputError : ''
                }`}
                placeholder="Ваше ім'я та прізвище"
              />
              <div className={css.errorWrapper}>
                <ErrorMessage
                  name="name"
                  component="span"
                  className={css.error}
                />
              </div>
            </label>

            {/* Пошта */}
            <label className={css.labelRegisterForm}>
              Пошта*
              <Field
                type="email"
                name="email"
                className={`${css.inputRegisterForm} ${
                  errors.email && touched.email ? css.inputError : ''
                }`}
                placeholder="hello@podorozhnyky.ua"
              />
              <div className={css.errorWrapper}>
                <ErrorMessage
                  name="email"
                  component="span"
                  className={css.error}
                />
              </div>
            </label>

            {/* Пароль */}
            <label className={css.labelRegisterForm}>
              Пароль*
              <Field
                type="password"
                name="password"
                className={`${css.inputRegisterForm} ${
                  errors.password && touched.password ? css.inputError : ''
                }`}
                placeholder="********"
              />
              <div className={css.errorWrapper}>
                <ErrorMessage
                  name="password"
                  component="span"
                  className={css.error}
                />
              </div>
            </label>

            <button
              className={css.button}
              type="submit"
              disabled={!(isValid && dirty)}
            >
              Зареєструватись
            </button>
          </Form>
        )}
      </Formik>
      {error && <p className={css.errorAfterForm}>{error}</p>}
    </section>
  );
}
