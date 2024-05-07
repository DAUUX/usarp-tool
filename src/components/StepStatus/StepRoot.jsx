import styles from "./styles.module.scss";
import PropTypes from "prop-types";
export function StepRoot({ children }) {
  return <div className={styles.step}>{children}</div>;
}
StepRoot.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};