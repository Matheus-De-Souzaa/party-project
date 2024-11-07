import React from "react";
import ReactDOM from "react-dom/client"; 
import App from "./App";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Home from "./routes/Home";
import CreateParty from "./routes/CreateParty";
import Party from "./routes/Party";
import EdiParty from "./routes/EditParty";

const router = createBrowserRouter([
{
  path: "/",
  element: <App />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
       path: "/party/new",
       element: <CreateParty />,
    },
    {
      path: "/party/:id",
      element: <Party />,
   },
   {
    path: "/party/edit/:id",
    element: <EdiParty />,
   },
  ],
},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
