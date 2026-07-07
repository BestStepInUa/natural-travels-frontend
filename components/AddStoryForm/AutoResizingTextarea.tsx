'use client';

import { Field, ErrorMessage } from 'formik';
import css from './AddStoryForm.module.css';

interface AutoResizingTextareaProps {
  label: string;
  name: string;
  id: string;
  placeholder: string;
  error?: string;
  touched?: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

export default function AutoResizingTextarea({
  label,
  name,
  id,
  placeholder,
  error,
  touched,
  textareaRef,
}: AutoResizingTextareaProps) {
  return (
    <div className={css.fieldWrapper}>
      <label htmlFor={id} className={css.label}>
        {label}
      </label>
      <Field
        as="textarea"
        id={id}
        name={name}
        innerRef={textareaRef}
        placeholder={placeholder}
        className={`${css.textarea} ${
          touched && error ? css.inputError : ''
        }`}
      />
      <ErrorMessage name={name} component="span" className={css.error} />
    </div>
  );
}
