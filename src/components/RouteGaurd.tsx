import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { userUserData } from "../store/UserStore";

const RouteGaurd = ({ children }: { children: ReactNode }) => {
  const [accessToken, user] = userUserData((state) => [
    state.accessToken,
    state.user,
  ]);
  const isUser = JSON.parse(localStorage.getItem("accessToken") || "");

  if (isUser && accessToken && user && isUser === accessToken) {
    return children;
  }
  return <Navigate to="/" />;
};

export default RouteGaurd;
