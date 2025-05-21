import { createContext, useContext, useState } from 'react';
import PropTypes from "prop-types";

GlobalDropdownProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const GlobalDropdownContext = createContext();

export function GlobalDropdownProvider({ children }) {
  const [openDropdownId, setOpenDropdownId] = useState(null);

  return (
    <GlobalDropdownContext.Provider value={{ openDropdownId, setOpenDropdownId }}>
      {children}
    </GlobalDropdownContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalDropdown = () => useContext(GlobalDropdownContext);