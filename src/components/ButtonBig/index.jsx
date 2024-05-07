import styles from "./styles.module.scss";
import PropTypes from "prop-types";
export function ButtonBig({ label, ...rest }) {
  return (
    <button className={styles.buttonbig__container} {...rest}>
      <div></div>
      {label}
    </button>
  );
}
ButtonBig.propTypes = {
  label: PropTypes.string.isRequired,
};
