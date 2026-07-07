'use client';

import { login } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import css from './LoginForm.module.css';
import { useAuthStore } from '@/lib/store/authStore/authStore';


const ValidationSchemaLogin = Yup.object().shape({
  email: Yup.string()
    .email('Введіть коректний email')
    .required('Введіть email для реєстрації'),
  password: Yup.string().required('Введіть пароль'),
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
      console.error('Login error:', error);
      const serverMessage ="Сталася помилка";
      setError(serverMessage);
      formikHelpers.setFieldError("email", "Email не валідний або вже використовується, спробуй ще раз");
    }
  };
  return (
    <div className="container">
      <h1 className={css.register}>Вхід</h1>
      <p className={css.p}>Вітаємо знову у спільноту мандрівників!</p>
      <Formik
  validationSchema={ValidationSchemaLogin}
  initialValues={initialValues}
  onSubmit={handleSubmit}
>
  {({ errors, touched, dirty, isValid }) => (
    <Form className={css.form}>
      <label className={css.label}>
        Пошта*
        <Field
          className={`${css.input} ${
            errors.email && touched.email ? css.inputError : ""
          }`}
          type="email"
          name="email"
          placeholder="hello@podorozhnyky.ua"
        />
        <ErrorMessage name="email" component="span" className={css.error} />
      </label>

      <label className={css.label}>
        Пароль*
        <Field
          className={`${css.input} ${
            errors.password && touched.password ? css.inputError : ""
          }`}
          type="password"
          name="password"
          placeholder="********"
        />
        <ErrorMessage name="password" component="span" className={css.error} />
      </label>

      <button type="submit" className={css.button} disabled={!(isValid && dirty)}>Увійти</button>
    </Form>
  )}
</Formik>
      {error && <p className={css.errorAfterForm}>{error}</p>}
    </div>
  );
}
