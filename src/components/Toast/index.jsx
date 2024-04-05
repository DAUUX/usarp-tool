import PropTypes from "prop-types";
import styles from "./styles.module.scss";
export function Toast({ type, message, children, ...rest }) {
  return (
    <div
      className={
        type == "success" ? styles.toast__success : styles.toast__error
      }
    >
      <span>{message}</span>
      <button {...rest}>{children}</button>
    </div>
  );
}

Toast.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node,
};
