import { Navigate } from "react-router-dom";
import { authContext } from "../contexts/authContext";
import { useContext } from "react";

export default function ProtectAuthRoute({ children }) {
  const { userToken } = useContext(authContext);

  const isLoggedIn = !!userToken;

  return <>{isLoggedIn ? <Navigate to="/" /> : children}</>;
}
