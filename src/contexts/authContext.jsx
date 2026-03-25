import { createContext, useEffect, useState } from "react";
import { apiServices } from "../services/api";

export const authContext = createContext(0);

export default function AuthContextProvider({ children }) {
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));
  const [isLoading, setisLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userToken != null) {
      apiServices.setToken(userToken);
      getLoggedUserData();
    }
  }, [userToken]);

  async function getLoggedUserData() {
    setisLoading(true);

    try {
      const data = await apiServices.getLoggedUserData();
      setUserData(data.data.user);
    } catch (error) {
      if (error.status == 401) {
        localStorage.removeItem("token");
        setUserToken(null);
      }
    } finally {
      setisLoading(false);
    }
  }

  async function getMyProfile() {
    const user = await apiServices.getMyProfile();

    setUser(user);
  }

  return (
    <authContext.Provider
      value={{
        userToken,
        setUserToken,
        isLoading,
        userData,
        setUserData,
        user,
        setUser,
        getLoggedUserData,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
