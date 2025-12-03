import styles from "./styles.module.scss";
import PropTypes from "prop-types";
export function ButtonBigText({ children, ...rest }) {
  return (
    <span className={styles.buttonbig__text} {...rest}>
      {children}
    </span>
  );
}
ButtonBigText.propTypes = {
  children: PropTypes.node,
};
