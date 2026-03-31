import styles from "./styles.module.scss";

export function Modal({ icon, title, text, children }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.icon}>{icon}</div>
        <h3>{title}</h3>
        <p>{text}</p>
        <div className={styles.actions}>{children}</div>
      </div>
    </div>
  );
}
