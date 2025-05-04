import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import { useDropdown } from  "./DropdownRoot.";

DropdownMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.any.isRequired,
  onClick: PropTypes.func,
};


export function DropdownMenuItem({ children, value, onClick, ...rest }) {
  const { handleSelect } = useDropdown();
  const handleClick = () => {
    handleSelect(value);
    if (onClick) onClick(value);
  };
  return (
    <div {...rest} className={styles.dropdown_menu_item} onClick={handleClick}>
      {children}
    </div>
  );
}