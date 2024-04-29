import Root from "@/layouts/root";
import Employee from "@/pages/employee";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/management/employee",
        element: <Employee />,
      },
    ],
  },
]);
