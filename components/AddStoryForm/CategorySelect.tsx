'use client';

import { ErrorMessage } from 'formik';
import css from './AddStoryForm.module.css';

interface CategorySelectProps {
  categories: { id: string; label: string }[];
  selectedValue: string;
  error?: string;
  touched?: boolean;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  onCategorySelect: (id: string) => void;
}

export default function CategorySelect({
  categories,
  selectedValue,
  error,
  touched,
  isDropdownOpen,
  setIsDropdownOpen,
  dropdownRef,
  onCategorySelect,
}: CategorySelectProps) {
  const selectedCategoryLabel =
    categories.find((cat) => cat.id === selectedValue)?.label || 'Категорія';

  return (
    <div className={css.fieldWrapper} ref={dropdownRef}>
      <span className={css.label}>Категорія</span>
      <div className={css.selectContainer}>
        <button
          type="button"
          className={`${css.selectToggle} ${isDropdownOpen ? css.selectToggleActive : ''} ${
            touched && error ? css.inputError : ''
          }`}
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          <span>{selectedCategoryLabel}</span>
          <span className={`${css.selectChevron} ${isDropdownOpen ? css.selectChevronOpen : ''}`}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>
        {isDropdownOpen && (
          <ul className={css.optionsList}>
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={`${css.optionItem} ${selectedValue === cat.id ? css.optionItemActive : ''}`}
                onClick={() => onCategorySelect(cat.id)}
              >
                {cat.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <ErrorMessage name="category" component="span" className={css.error} />
    </div>
  );
}
