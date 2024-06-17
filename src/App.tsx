import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import InfiniteQuery from "./pages/InfiniteQuery/InfiniteQuery";
import Table from "./pages/Table/Table";
import MantineTable from "./pages/MantineTable/MantineTable";
// import MantineTable from "./pages/MantineTable/MantineTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/pokemon",
    element: <InfiniteQuery />,
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
    element:<MantineTable />
  }
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
