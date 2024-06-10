import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export function FeedbackAlertButton({ label, ...rest }) {
  return <button className={styles.feedbackalert__button} {...rest}>{label}</button>;
}
FeedbackAlertButton.propTypes = {
  label: PropTypes.string.isRequired,
};
