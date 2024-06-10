import { createContext, useContext, useState } from "react";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

const DropdownContext = createContext();
DropdownRoot.propTypes = {
  children: PropTypes.node,
};
export function DropdownRoot({ children, ...rest }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);
  const handleSelect = (value) => {
    setSelectedValue(value);
    closeDropdown();
  };
  
  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        selectedValue,
        toggleDropdown,
        handleSelect,
        closeDropdown,
      }}
    >
      <div 
        {...rest}
        className={rest.default || selectedValue ? styles.dropdown__selected: styles.dropdown}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDropdown = () => useContext(DropdownContext);
