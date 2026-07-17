'use client';

import { ErrorMessage } from 'formik';
import css from './AddStoryForm.module.css';

interface ImageUploaderProps {
  imagePreview: string | null;
  error?: string;
  touched?: boolean;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDelete: () => void;
}

export default function ImageUploader({
  imagePreview,
  error,
  touched,
  onImageChange,
  onImageDelete,
}: ImageUploaderProps) {
  return (
    <div className={css.fieldWrapper}>
      <span className={css.label}>Обкладинка статті</span>

      <input
        type="file"
        id="cover-image"
        accept="image/*"
        className="visually-hidden"
        onChange={onImageChange}
      />

      <label
        htmlFor="cover-image"
        className={`${css.imagePlaceholder} ${
          touched && error ? css.imagePlaceholderError : ''
        }`}
        aria-label="Завантажити обкладинку статті"
      >
        {imagePreview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imagePreview} alt="Обкладинка статті" className={css.previewImage} />
        ) : (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 335 223"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="335" height="223" rx="12" fill="#E0E0E0" />
            <g transform="translate(131.5, 75.5)">
              <rect width="72" height="72" rx="16" fill="#B3B3B3" />
              <circle cx="26" cy="26" r="4.5" fill="#E0E0E0" />
              <path
                d="M17 53.5 L31.5 35 L42.5 46.5 L50.5 31.5 L57.5 40 L57.5 53.5 Z"
                fill="#E0E0E0"
              />
            </g>
          </svg>
        )}
      </label>

      {imagePreview ? (
        <button type="button" className={css.deleteButton} onClick={onImageDelete}>
          Видалити фото
        </button>
      ) : (
        <label htmlFor="cover-image" className={css.uploadButton}>
          Завантажити фото
        </label>
      )}

      <ErrorMessage name="coverImage" component="span" className={css.error} />
    </div>
  );
}
