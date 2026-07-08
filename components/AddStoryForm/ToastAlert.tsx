'use client';

import css from './AddStoryForm.module.css';

interface ToastAlertProps {
  message: string | null;
}

export default function ToastAlert({ message }: ToastAlertProps) {
  if (!message) return null;

  return (
    <div className={css.toast}>
      <span className={css.toastIcon}>⚠️</span>
      <span className={css.toastText}>{message}</span>
    </div>
  );
}
