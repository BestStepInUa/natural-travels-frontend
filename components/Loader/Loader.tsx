import css from './Loader.module.css';

type LoaderProps = {
  label?: string;
};

export default function Loader({ label = 'Завантаження…' }: LoaderProps) {
  return (
    <div className={css.wrapper} role="status" aria-live="polite">
      <span className={css.spinner} />
      <span className="visually-hidden">{label}</span>
    </div>
  );
}
