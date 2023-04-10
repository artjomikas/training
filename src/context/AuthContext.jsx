import { useState, createContext } from "react";
import { IdentityService } from "../services/IdentityService";

import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (localStorage.getItem("tokens")) {
      let tokens = JSON.parse(localStorage.getItem("tokens"));
      return jwt_decode(tokens.jwt);
    }
    return null;
  });

  const setJwtResponse = async (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setUser(jwt_decode(data.jwt));
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

  // const register = async (data) => {
  //   const apiResponse = await axios.post(
  //     "http://localhost:4000/auth/login",
  //     payload
  //   );
  //   localStorage.setItem("tokens",  JSON.stringify(apiResponse.data));
  //   setUser(jwt_decode(apiResponse.data.access_token));
  //   navigate("/");
  // };

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
