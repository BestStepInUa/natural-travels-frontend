import css from "./AuthFooter.module.css";

export default function AuthFooter() {
  return (
    <footer className={css.footer}>
      <div className="container">
        <p className={css.text}>© 2025 Природні Мандри</p>
      </div>
    </footer>
  );
}
