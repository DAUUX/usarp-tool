import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

export function SidebarButton({ children, active, text, route }) {
  return (
    <Link
      to={route}
      aria-pressed={active}
      className={styles.sidebarButton__container}
    >
      {children}
      <span>{text}</span>
    </Link>
  );
}
SidebarButton.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  text: PropTypes.string,
  route: PropTypes.string,
};
