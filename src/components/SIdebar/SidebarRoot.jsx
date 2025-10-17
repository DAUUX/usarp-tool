import styles from "./styles.module.scss";
import { images } from "../../assets/images/images";

import PropTypes from "prop-types";
export function SidebarRoot({ children }) {
  return (
    <aside className={styles.sidebar__container}>
      <figure>
        <img src={images.pixelLogo} alt="Logo USARP" />
      </figure>
      <nav>{children}</nav>
    </aside>
  );
}
SidebarRoot.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};
