import { useState, createContext } from "react";
import { IdentityService } from "../services/IdentityService";

import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const formatJWT = (data) => {
    const url = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/";

    const newData = {
      id: data[url + "nameidentifier"],
      firstName: data[url + "givenname"],
      lastName: data[url + "surname"],
      email: data[url + "emailaddress"],
      exp: data["exp"],
    };
    return newData;
  };

  const [user, setUser] = useState(() => {
    if (localStorage.getItem("tokens")) {
      let tokens = JSON.parse(localStorage.getItem("tokens"));
      const decodedJWT = jwt_decode(tokens.jwt);
      const userData = formatJWT(decodedJWT);
      return userData;
    }
    return null;
  });

  const setJwtResponse = async (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    const decodedJWT = jwt_decode(data.jwt);
    const userData = formatJWT(decodedJWT);
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
