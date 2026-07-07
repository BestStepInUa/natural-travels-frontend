import css from "./AuthFooter.module.css";

export default function AuthFooter() {
  return (
    <footer className="container">
      <div className={css.footer}>
        <p className={css.text}>© 2025 Природні Мандри</p>
      </div>
    </footer>
  );
}
