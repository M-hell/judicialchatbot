import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Intro from "../pages/Intro";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import CheckPassword from "../pages/CheckPassword";
import AddCase from "../components/AddCase";
import CaseDetails from "../components/CaseDetails";
import Add_hearing from "../pages/Add_hearing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "intro",
        element: <Intro />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "password",
        element: <CheckPassword />,
      },
      {
        path: "add-case",
        element: <AddCase />,
      },
      {
        path: "case/:id",
        element: <CaseDetails />,
      },
      {
        path: "Add_hearing", // Match the casing in the URL
        element: <Add_hearing />,
      },
    ],
  },
]);

export default router;
