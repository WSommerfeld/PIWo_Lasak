import React from "react";
import ReactDOM from "react-dom/client";
import Login from './routes/Login.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from "./App.jsx";
import Home from "./routes/home.jsx";
import New from "./routes/new.jsx";

/*trasy (zastąpienie routes.js)*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> }, 
      { path: "new", element: <New /> },
	   { path: 'login', element: <Login /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
