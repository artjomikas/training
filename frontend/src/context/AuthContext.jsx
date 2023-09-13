import { useState, createContext, useEffect } from "react";
import { IdentityService } from "../services/IdentityService";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [initializing, setInitializing] = useState(true);

  const getUserById = async (data) => {
    const identityService = new IdentityService();
    const url = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/";
    const id = data[url + "nameidentifier"];
    const user = await identityService.getById(id);
    return user;
  };

  const [user, setUser] = useState(null);

  const setJwtResponse = async (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    const decodedJWT = jwt_decode(data.jwt);
    const userData = await getUserById(decodedJWT);
    setUser(userData);
  };

  const logout = async () => {
    const data = JSON.parse(localStorage.getItem("tokens"));
    const identity = new IdentityService();
    const refreshToken = {
      refreshToken: data.refreshToken,
    };
    await identity.logout(refreshToken);

    localStorage.removeItem("tokens");
    setUser(null);
  };

  useEffect(() => {
    async function fetchUser() {
      if (localStorage.getItem("tokens") || user) {
        let tokens = JSON.parse(localStorage.getItem("tokens"));
        const decodedJWT = jwt_decode(tokens.jwt);

        const userData = await getUserById(decodedJWT);
        setUser(userData);
        setInitializing(false);
      }
      else{
        setUser(null);
        setInitializing(false);
      }
    }
    fetchUser();
  }, [localStorage.getItem("tokens")]);

  if (initializing) return null;
  
  return (
    <AuthContext.Provider
      value={{
        user,
        setJwtResponse,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
