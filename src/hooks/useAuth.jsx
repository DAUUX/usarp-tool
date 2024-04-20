import axios from "axios";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();
const User = {
  email: "",
  fullname: "",
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [signed, setSigned] = useState(false);
  const [user, setUser] = useState(User);

  useEffect(() => {
    if (token) {
      setSigned(true);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("@AccessToken", token);

      const { email, fullname } = jwtDecode(token);
      setUser({ email, fullname });
    }
  }, [token]);

  function handleLogout() {
    setSigned(false);
    localStorage.removeItem("@AccessToken");
  }

  const contextValue = useMemo(
    () => ({
      user,
      signed,
      setToken,
      handleLogout,
    }),
    [signed, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
