import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import { useDropdown } from "./DropdownContext";

DropdownMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.any.isRequired,
};


export function DropdownMenuItem({ children, value }) {
  const { handleSelect } = useDropdown();

  return (
    <div
      className={styles.dropdown_menu_item}
      onClick={() => handleSelect(value)}
    >
      {children}
    </div>
  );
}

DropdownMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.any.isRequired,
};
