import Usarp from "../assets/icons/usarp_icon.svg?react";
import PropTypes from "prop-types";
import { Dash } from "../assets/icons/dash";
import { EyeOn } from "../assets/icons/EyeOn";
import { EyeOff } from "../assets/icons/EyeOff";

export function IconChoice({ icon, color }) {
  switch (icon) {
    case "usarp":
      return <Usarp />;
    case "eyeOn":
      return <EyeOn color={color} />;
    case "eyeOff":
      return <EyeOff color={color} />;
    case "dash":
      return <Dash color={color} />;
    default:
      return null;
  }
}
IconChoice.propTypes = {
  icon: PropTypes.node.isRequired,
  color: PropTypes.node.isRequired,
};
