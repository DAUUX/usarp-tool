import PropTypes from "prop-types";
export function FeedbackAlertTitle({ title, name, ...rest}) {
  return (
    <h6 {...rest}>
      {title}
      {name && <span>{name}</span>}
    </h6>
  );
}
FeedbackAlertTitle.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string,
};