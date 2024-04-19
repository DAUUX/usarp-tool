import Usarp from "../assets/icons/usarp_icon.svg?react";
import PropTypes from "prop-types";
import { Dash } from "../assets/icons/dash";
import { EyeOn } from "../assets/icons/EyeOn";
import { EyeOff } from "../assets/icons/EyeOff";
import { Close } from "../assets/icons/close";
import { Check } from "../assets/icons/Check";
import { Brainstorming } from "../assets/icons/Brainstorming";
import { Home } from "../assets/icons/Home";
import { Project } from "../assets/icons/Project";
import { Option } from "../assets/icons/Option";
import { CloseCircle } from "../assets/icons/CloseCircle";
import { CheckCircle } from "../assets/icons/CheckCircle";

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
    case "close":
      return <Close color={color} />;
    case "check":
      return <Check color={color} />;
    case "home":
      return <Home color={color} />;
    case "project":
      return <Project color={color} />;
    case "brainstorming":
      return <Brainstorming color={color} />;
    case "option":
      return <Option color={color} />;
    case "closecircle":
      return <CloseCircle color={color} />;
    case "checkcircle":
      return <CheckCircle color={color} />;
    default:
      return null;
  }
}
IconChoice.propTypes = {
  icon: PropTypes.node.isRequired,
  color: PropTypes.string,
};
