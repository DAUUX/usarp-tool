import PropTypes from "prop-types";
export function FeedbackAlertButton({ label, ...rest }) {
  return <button {...rest}>{label}</button>;
}
FeedbackAlertButton.propTypes = {
  label: PropTypes.string.isRequired,
};
