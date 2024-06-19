import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { userUserData } from "../../store/UserStore";
import { Button } from "@mantine/core";

const HomePage = () => {
  const [user, clearUser] = userUserData((state) => [
    state.user,
    state.clearUser,
  ]);
  const navigate = useNavigate();
  function handleLogOut() {
    localStorage.removeItem("accessToken");
    // localStorage.removeItem("user-data");
    clearUser();
    navigate("/");
  }
  return (
    <div className="w-full h-screen bg-slate-800 grid place-items-center">
      <h1 className="text-3xl font-semibold capitalize text-white">
        Welcome to the home page {user?.fullName}!
      </h1>
      <div className="flex gap-4">
        <Link className="btn" to="/pokemon">
          Pokemon List
        </Link>
        <Link className="btn" to="/mantine-react-table">
          Mantine-react-table
        </Link>
        <Link className="btn" to="/mantine-table">
          Mantine-table
        </Link>
        <Button onClick={handleLogOut} variant="filled" color="red">
          LogOut
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
