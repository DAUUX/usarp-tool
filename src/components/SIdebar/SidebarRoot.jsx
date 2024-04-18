import styles from "./styles.module.scss";
import Logo from "../../assets/images/logo.png";

import PropTypes from "prop-types";
export function SidebarRoot({ children }) {
  return (
    <aside className={styles.sidebar__container}>
      <figure>
        <img src={Logo} alt="Logo USARP" />
      </figure>
      <nav>
        {children}
      </nav>
    </aside>
  );
}
SidebarRoot.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};
