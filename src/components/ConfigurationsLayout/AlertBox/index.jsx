import styles from "./styles.module.scss";
import { IconChoice } from "../../../utils/IconChoice";
import { PropTypes } from "prop-types";

export function AlertBox({message, icon, type}) {
  const color = () => {
    switch(type) {
      case 'warning': return "var(--th-color-background-profile-alert-warning)"
      case 'danger': return "var(--th-color-background-profile-alert-danger)"
      default: return "transparent"
    }
  }

  return (
    <div style={{backgroundColor: color()}} className={styles.AlertBox}>
      <span>{message}</span>
      <IconChoice icon={icon} color="var(--th-color-text-profile-alert)" />
    </div>
  );
}

AlertBox.propTypes = {
  message: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string
}
