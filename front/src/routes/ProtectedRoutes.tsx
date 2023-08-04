import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <Outlet />;
};
