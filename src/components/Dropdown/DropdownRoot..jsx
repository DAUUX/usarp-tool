import { createContext, useContext, useState, useId, useEffect } from "react";
import { useGlobalDropdown } from "./GlobalDropdownContext";
import styles from "./styles.module.scss";
import PropTypes from "prop-types";

const DropdownContext = createContext();
export function DropdownRoot({ children, onSelect, ...rest }) {
  const dropdownId = useId();
  const { openDropdownId, setOpenDropdownId } = useGlobalDropdown();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    if (openDropdownId && openDropdownId !== dropdownId) {
      setIsOpen(false);
    }
  }, [openDropdownId, dropdownId]);

  const toggleDropdown = () => {
    if (isOpen) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(dropdownId);
    }
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setOpenDropdownId(null);
  };

  const clearSelection = () => {
    setSelectedValue(null);
    if (onSelect) onSelect(null);
  };

  const handleSelect = (value) => {
    setSelectedValue(value);
    closeDropdown();
    if (onSelect) onSelect(value);
  };

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        selectedValue,
        toggleDropdown,
        handleSelect,
        closeDropdown,
        clearSelection,
      }}
    >
      <div
        {...rest}
        className={
          rest.default || selectedValue
            ? styles.dropdown__selected
            : styles.dropdown
        }
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

DropdownRoot.propTypes = {
  children: PropTypes.node,
  onSelect: PropTypes.func,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDropdown = () => useContext(DropdownContext);
