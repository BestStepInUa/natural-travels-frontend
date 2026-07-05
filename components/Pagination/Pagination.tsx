import css from './Pagination.module.css';
interface PaginationProps {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  fullWidthOnMobile?: boolean;
}

export default function Pagination({
  onLoadMore,
  isLoading,
  hasMore,
  fullWidthOnMobile,
}: PaginationProps) {
  if (!hasMore) {
    return null;
  }

  return (
    <div className={css.wrapper}>
      <button
        className={`${css.button} ${fullWidthOnMobile ? css.fullWidthOnMobile : ''}`}
        type="button"
        onClick={onLoadMore}
        disabled={isLoading}
      >
        {isLoading ? 'Завантаження...' : 'Показати ще'}
      </button>
    </div>
  );
}
