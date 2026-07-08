'use client';
import { useEffect } from 'react';
import { Field, ErrorMessage, useFormikContext} from 'formik';
import css from './AddStoryForm.module.css';
import { StoryFormValues } from './validation';
interface AutoResizingTextareaProps {
  label: string;
  name: keyof StoryFormValues;
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

  const { values } = useFormikContext<StoryFormValues>();
  const currentValue = values[name];

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [currentValue, textareaRef]);
  
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
