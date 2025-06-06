import { IconChoice } from "../../utils/IconChoice";
import styles from "./styles.module.scss";

export function CheckboxRoot({ children, checked, ...props }) {
  return (
    <label className={styles.checkbox__container}>
      <input type="checkbox" {...props} />
      <div className={styles.checkmark + ` ${checked ? styles.checked : ""}`}>
        <span className={styles.checkmark__icon}>
          <IconChoice icon={"check"} />
        </span>
      </div>
      {children}
    </label>
  );
}
