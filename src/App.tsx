import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import InfiniteQuery from "./pages/InfiniteQuery/InfiniteQuery";
import Table from "./pages/Table/Table";
import MantineTable from "./pages/MantineTable/MantineTable";
// import MantineTable from "./pages/MantineTable/MantineTable";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegistrationPage/Register";
import RouteGaurd from "./components/RouteGaurd";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: (
      <RouteGaurd>
        <HomePage />
      </RouteGaurd>
    ),
  },
  {
    path: "/pokemon",
    element: (
      <RouteGaurd>
        <InfiniteQuery />
      </RouteGaurd>
    ),
  },
  {
    path: "*",
    element: (
      <div className="w-full h-screen bg-slate-800 grid place-items-center">
        <h1 className="text-3xl font-semibold capitalize ">
          Error 404 page not found
        </h1>
      </div>
    ),
  },
  {
    path: "/mantine-react-table",
    element: <Table />,
  },
  {
    path: "/mantine-table",
    element: <MantineTable />,
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />;
    </>
  );
};

export default App;
