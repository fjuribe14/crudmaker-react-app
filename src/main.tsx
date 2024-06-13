import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "./components/ui/sonner.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//** Components of routes */
import App from "./app/App.tsx";
import ViewUserId from "./app/pages/user/[id].tsx";
import UserEditPage from "./app/pages/user/edit.tsx";
import CreateUserPage from "./app/pages/user/create.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/users",
    children: [
      {
        path: "create",
        element: <CreateUserPage />,
      },
      {
        path: "view/:id",
        element: <ViewUserId />,
      },
      {
        path: "edit/:id",
        element: <UserEditPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);
