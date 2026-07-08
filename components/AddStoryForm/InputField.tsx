'use client';

import { Field, ErrorMessage } from 'formik';
import css from './AddStoryForm.module.css';

interface InputFieldProps {
  label: string;
  name: string;
  id: string;
  placeholder: string;
  error?: string;
  touched?: boolean;
}

export default function InputField({
  label,
  name,
  id,
  placeholder,
  error,
  touched,
}: InputFieldProps) {
  return (
    <div className={css.fieldWrapper}>
      <label htmlFor={id} className={css.label}>
        {label}
      </label>
      <Field
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        className={`${css.input} ${
          touched && error ? css.inputError : ''
        }`}
      />
      <ErrorMessage name={name} component="span" className={css.error} />
    </div>
  );
}
