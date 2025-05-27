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
import { Gear } from "../assets/icons/Gear";
import { Lock } from "../assets/icons/Lock";
import { WarningCircle } from "../assets/icons/WarningCircle";
import { BackArrow } from "../assets/icons/BackArrow";
import { Plus } from "../assets/icons/Plus";
import { Arrow } from "../assets/icons/Arrow";
import { Calendar } from "../assets/icons/Calendar";
import { Clock } from "../assets/icons/Clock";
// import { WarningCircle } from "../assets/icons/WarningCircle";
import { Info } from "../assets/icons/Info";
import { ArrowUp } from "../assets/icons/ArrowUp";
import { Develop } from "../assets/icons/Develop";
import { Delete } from "../assets/icons/Delete";
import { Edit } from "../assets/icons/Edit";
import { Star } from "../assets/icons/Star";
import { Folder } from "../assets/icons/Folder";
import { Lamp } from "../assets/icons/Lamp";
import { Translate } from "../assets/icons/Translate";
import { User01 } from "../assets/icons/User01";
import { User02 } from "../assets/icons/User02";
import { User03 } from "../assets/icons/User03";
import { User05 } from "../assets/icons/User05";
import { User06 } from "../assets/icons/User06";
import { User04 } from "../assets/icons/User04";
import { StatisticsLamp } from "../assets/icons/StatisticsLamp";
import { StatisticsUserStory } from "../assets/icons/StatisticsUserStory";

export function IconChoice({ icon, color, ...rest }) {
  switch (icon) {
    case "usarp":
      return <Usarp {...rest} />;
    case "eyeOn":
      return <EyeOn color={color} {...rest} />;
    case "eyeOff":
      return <EyeOff color={color} {...rest} />;
    case "dash":
      return <Dash color={color} {...rest} />;
    case "close":
      return <Close color={color} {...rest} />;
    case "check":
      return <Check color={color} {...rest} />;
    case "home":
      return <Home color={color} {...rest} />;
    case "project":
      return <Project color={color} {...rest} />;
    case "brainstorming":
      return <Brainstorming color={color} {...rest} />;
    case "option":
      return <Option color={color} {...rest} />;
    case "closecircle":
      return <CloseCircle color={color} {...rest} />;
    case "checkcircle":
      return <CheckCircle color={color} {...rest} />;
    case "warningcircle":
      return <WarningCircle color={color} {...rest} />;
    case "gear":
      return <Gear color={color} {...rest} />;
    case "lock":
      return <Lock color={color} />;
    case "warning":
      return <WarningCircle color={color} />;
    case "back":
      return <BackArrow color={color} {...rest} />;
    case "plus":
      return <Plus color={color} {...rest} />;
    case "clock":
      return <Clock color={color} {...rest} />;
    case "calendar":
      return <Calendar color={color} {...rest} />;
    case "arrowup":
      return <ArrowUp color={color} {...rest} />;
    case "arrowdown":
      return <Arrow color={color} {...rest} />;
    case "develop":
      return <Develop color={color} {...rest} />;
    case "delete":
      return <Delete color={color} {...rest} />;
    case "edit":
      return <Edit color={color} {...rest} />;
    case "star":
      return <Star color={color} {...rest} />;
    case "info":
      return <Info color={color} {...rest} />;
    case "folder":
      return <Folder color={color} {...rest} />;
    case "translate":
      return <Translate color={color} {...rest} />;
    case "lamp":
      return <Lamp color={color} {...rest} />;
    case "user01":
      return <User01 color={color} {...rest} />;
    case "user02":
      return <User02 color={color} {...rest} />;
    case "user03":
      return <User03 color={color} {...rest} />;
    case "user04":
      return <User04 color={color} {...rest} />;
    case "user05":
      return <User05 color={color} {...rest} />;
    case "user06":
      return <User06 color={color} {...rest} />;
    case "statisticsLamp":
      return <StatisticsLamp color={color} {...rest} />;
    case "statisticsUserStory":
      return <StatisticsUserStory color={color} {...rest} />;
    default:
      return null;
  }
}
IconChoice.propTypes = {
  icon: PropTypes.node.isRequired,
  color: PropTypes.string,
};
