import { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import { useDropdown } from "./DropdownRoot.";

DropdownMenu.propTypes = {
  children: PropTypes.node.isRequired,
};

export function DropdownMenu({ children, ...rest }) {
  const { isOpen, closeDropdown } = useDropdown();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(`.${styles.dropdown_trigger}`) &&
        event.target.tagName.toLowerCase() !== "svg"
      ) {
        closeDropdown();
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, closeDropdown]);

  return (
    <div {...rest} className={isOpen ? styles.dropdown_open : styles.dropdown_close}>
      {children}
    </div>
  );
}
