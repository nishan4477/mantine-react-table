import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RouteGaurd from "./components/RouteGaurd";
import HomePage from "./pages/HomePage/HomePage";
import InfiniteQuery from "./pages/InfiniteQuery/InfiniteQuery";
import Login from "./pages/LoginPage/Login";
import MantineTable from "./pages/MantineTable/MantineTable";
import Register from "./pages/RegistrationPage/Register";
import Table from "./pages/Table/Table";

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
