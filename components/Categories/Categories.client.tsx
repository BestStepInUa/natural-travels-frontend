'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useCategoryStore } from '@/lib/store/categoryStore/categoryStore';
import { PageTitle } from '@/components/PageTitle/PageTitle';
import css from '@/components/AddStoryForm/AddStoryForm.module.css';

type Props = {
  currentSlug: string;
};

export default function CategoriesClient({ currentSlug }: Props) {
  const router = useRouter();
  const { categories, isLoading, fetchCategories } = useCategoryStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedCategoryLabel =
    categories.find((cat) => cat.slug === currentSlug)?.category || 'Всі статті';

  if (isLoading && categories.length === 0)
    return <div>Завантаження категорій...</div>;

  return (
    <div className={css.stories}>
      <PageTitle
        variant="title"
        color="scheme1"
        marginBottom={40}
        align="center"
      >
        Статті
      </PageTitle>

      <div className={`${css.fieldWrapper} ${css.hidden}`} ref={dropdownRef}>
        <div className={css.selectContainer}>
          <button
            type="button"
            className={`${css.selectToggle} ${isDropdownOpen ? css.selectToggleActive : ''}`}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <span>{selectedCategoryLabel}</span>
            <span
              className={`${css.selectChevron} ${isDropdownOpen ? css.selectChevronOpen : ''}`}
            >
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
              <li
                className={css.optionItem}
                onClick={() => {
                  router.push('/stories/filter/all');
                  setIsDropdownOpen(false);
                }}
              >
                Всі статті
              </li>

              {categories.map((cat) => (
                <li
                  key={cat._id}
                  className={`${css.optionItem} ${currentSlug === cat.slug ? css.optionItemActive : ''}`}
                  onClick={() => {
                    router.push(`/stories/filter/${cat.slug}`);
                    setIsDropdownOpen(false);
                  }}
                >
                  {cat.category}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}