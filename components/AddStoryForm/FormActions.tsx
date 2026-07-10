'use client';

import css from './AddStoryForm.module.css';

interface FormActionsProps {
  isSaveDisabled: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
}

export default function FormActions({
  isSaveDisabled,
  isSubmitting,
  onCancel,
}: FormActionsProps) {
  return (
    <div className={css.buttonContainer}>
      <button
        type="button"
        onClick={onCancel}
        className={css.cancelButton}
      >
        Відмінити
      </button>
      <button
        type="submit"
        disabled={isSaveDisabled}
        className={css.saveButton}
      >
        {isSubmitting ? <div className={css.spinner} /> : 'Зберегти'}
      </button>
    </div>
  );
}
