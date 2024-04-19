import PropTypes from "prop-types";
import { IconChoice } from "../../utils/IconChoice";

export function FeedbackAlertIcon({ icon }) {
  return <IconChoice icon={icon} />;
}
FeedbackAlertIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};