import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IconChoice } from "../../../utils/IconChoice";
import { PropTypes } from "prop-types";

export function SidebarOption({ label, link, icon, ...buttonProps }) {

  link = link.split("/")
  link = link[link.length-1]
  const location = useLocation();
  let dataSelected = (location.pathname.includes(link));

  return (
    <Link to={link} className={styles.Profile__SidebarOption} data-selected={dataSelected}>
      <div {...buttonProps}>
        <IconChoice
          icon={icon}
          color={dataSelected ? 
            "var(--th-button-sidebar-text-selected)" : 
            "var(--th-button-sidebar-background)"} 
        />
        <span>{label}</span>
      </div>
    </Link>
  );
}

SidebarOption.propTypes = {
  label: PropTypes.string,
  link: PropTypes.string,
  icon: PropTypes.string
}