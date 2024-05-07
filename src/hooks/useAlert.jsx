import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertContent, setAlertContent] = useState(null);

  const open = (content) => {
    setAlertContent(content);
  };

  const close = () => {
    setAlertContent(null);
  };

  return (
    <AlertContext.Provider value={{ open, close }}>
      {children}
      {alertContent && <>{alertContent}</>}
    </AlertContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAlert = () => useContext(AlertContext);


AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
