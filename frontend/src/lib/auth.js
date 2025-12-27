import {useContext } from "react";
import AuthContext from "./AuthContext";

// export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Auth Context Missing");
  return context;
};

// export default AuthContext;
