import PropTypes from "prop-types";
import styles from "./styles.module.scss";

export function FeedbackAlertDescription({ description, ...rest}) {
  return (
    <h4 style={styles.feedbackAlert__description} {...rest}>
      {description}
    </h4>
  );
}
FeedbackAlertDescription.propTypes = {
  description: PropTypes.string.isRequired,
};
