import css from './AuthHeader.module.css';

export default function AuthHeader() {
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.content}>
          <img src="" alt="icon" />
          <p className={css.textAuthHeader}>Прирордні мандри</p>
        </div>
      </div>
    </header>
  );
}
