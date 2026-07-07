'use client';

import { ApiError, createErrorResponce } from '@/app/api/_utils/utils';
import { register } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import css from './RegisterForm.module.css';
import { useAuthStore } from '@/lib/store/authStore/authStore';

const ValidationSchemaRegister = Yup.object().shape({
  userName: Yup.string().required("Введіть ім'я користувача"),
  email: Yup.string()
    .email('Введіть коректний email')
    .required('Введіть email для реєстрації'),
  password: Yup.string().required('Введіть пароль'),
});

interface RegisterValues {
  userName: string;
  email: string;
  password: string;
}

const initialValues: RegisterValues = {
  userName: '',
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
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      createErrorResponce(error as ApiError);
    }
  };
  return (
    <div className="container">
      <h1 className={css.registerH1}>Реєстрація</h1>
      <p className={css.textRegisterForm}>Раді вас бачити у спільноті мандрівників!</p>
      <Formik
        validationSchema={ValidationSchemaRegister}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, dirty, isValid }) => (
          <Form className={css.formRegister}>
            <label className={css.labelRegisterForm}>
              Ім`я та прізвище*
              <Field
                type="text"
                name="userName"
                className={`${css.inputRegisterForm} ${
            errors.password && touched.password ? css.inputError : ""
          }`}
                placeholder="Ваше ім'я та прізвище"
              />
              <ErrorMessage
                name="userName"
                component="span"
                className={css.error}
              />
            </label>
            <label className={css.labelRegisterForm}>
              Пошта*
              <Field
                type="email"
                name="email"
                className={`${css.inputRegisterForm} ${
            errors.password && touched.password ? css.inputError : ""
          }`}
                placeholder="hello@podorozhnyky.ua"
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
            </label>
            <label className={css.labelRegisterForm}>
              Пароль*
              <Field
                type="password"
                name="password"
                className={`${css.inputRegisterForm} ${
            errors.password && touched.password ? css.inputError : ""
          }`}
                placeholder="********"
              />
              <ErrorMessage
                name="password"
                component="span"
                className={css.error}
              />
            </label>
            <button className={css.button} type="submit" disabled={!(isValid && dirty)}>Зареєструватись</button>
          </Form>
        )}
      </Formik>
      {error && <p>{error}</p>}
    </div>
  );
}
