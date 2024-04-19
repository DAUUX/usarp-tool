import PropTypes from "prop-types";
export function FeedbackAlertDescription({ description, ...rest}) {
  return <span {...rest}>{description}</span>;
}
FeedbackAlertDescription.propTypes = {
  description: PropTypes.string.isRequired,
};
