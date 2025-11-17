import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const storedStatus = localStorage.getItem("auth");

  const [authStatus, setAuthStatus] = useState(storedStatus || "logout");
  const [token, setToken] = useState(storedToken || null);

  const login = (status, jwt) => {
    setAuthStatus(status);
    setToken(jwt);
    localStorage.setItem("auth", status);
    localStorage.setItem("token", jwt);
  };

  const logout = () => {
    setAuthStatus("logout");
    setToken(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ authStatus, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
