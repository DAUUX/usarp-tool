import styles from "./styles.module.scss";
import PropTypes from "prop-types";
export function ButtonBigRoot({ children, ...rest }) {
  return (
    <button
      data-type="primary"
      className={styles.buttonbig__container}
      {...rest}
    >
      {children}
    </button>
  );
}
ButtonBigRoot.propTypes = {
  children: PropTypes.node,
};
