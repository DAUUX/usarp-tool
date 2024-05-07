import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export function FeedbackAlertRoot({ children, ...rest }) {
  return (
    <div className={styles.overlay}>
      <div {...rest} className={styles.feedbackalert__container}>
        {children}
      </div>
      <div></div>
    </div>
  );
}
FeedbackAlertRoot.propTypes = {
  children: PropTypes.node.isRequired,
};
