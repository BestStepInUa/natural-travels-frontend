'use client';

import { login } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import css from './LoginForm.module.css';
import { useAuthStore } from '@/lib/store/authStore/authStore';
import { isAxiosError } from 'axios';

const ValidationSchemaLogin = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Введіть коректний email')
    .required('Введіть email')
    .max(64, 'Email не може перевищувати 64 символи'),

  password: Yup.string()
    .required('Введіть пароль')
    .min(8, 'Пароль повинен містити не менше 8 символів')
    .max(128, 'Пароль не може перевищувати 128 символів'),
});

interface LoginValues {
  email: string;
  password: string;
}
const initialValues: LoginValues = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser)

  const handleSubmit = async (
    values: LoginValues,
    formikHelpers: FormikHelpers<LoginValues>
  ) => {
    try {
      const user = await login(values);
      if (user) {
        setUser(user)
        formikHelpers.resetForm();
        router.push('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
  if (isAxiosError(error)) {
    const serverMessage = error.response?.data?.response?.message;
  if (serverMessage === "invalid credentials") {
      setError("Неправильний email або пароль");
      formikHelpers.setFieldError("email", "Перевірте дані для входу");
    } else {
      setError(serverMessage);
      formikHelpers.setFieldError("email", serverMessage);
    }
  }
}
  };
  return (
    <>
      <h1 className={css.LoginH1}>Вхід</h1>
      <p className={css.textLoginForm}>
        Вітаємо знову у спільноту мандрівників!
      </p>
      <Formik
        validationSchema={ValidationSchemaLogin}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, dirty, isValid }) => (
          <Form className={css.form}>
            {/* Пошта */}
            <label className={css.label}>
              Пошта*
              <Field
                className={`${css.input} ${
                  errors.email && touched.email ? css.inputError : ''
                }`}
                type="email"
                name="email"
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
            <label className={css.label}>
              Пароль*
              <Field
                className={`${css.input} ${
                  errors.password && touched.password ? css.inputError : ''
                }`}
                type="password"
                name="password"
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
              type="submit"
              className={css.button}
              disabled={!(isValid && dirty)}
            >
              Увійти
            </button>
          </Form>
        )}
      </Formik>
      {error && <p className={css.errorAfterForm}>{error}</p>}
    </>
  );
}
