import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import SignIn from "./pages/auth/SignIn.tsx";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "styled-components";
import LoggedInNav from "./layouts/LoggedInNav.tsx";
import SignUp from "./pages/auth/SignUp.tsx";
import UnauthenticatedNav from "./layouts/UnauthenticatedNav.tsx";

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <LoggedInNav>
        <App />
      </LoggedInNav>
    ),
  },
  {
    path: "/auth",
    element: (
      <UnauthenticatedNav>
        <SignIn />
      </UnauthenticatedNav>
    ),
  },
  {
    path: "/auth/signup",
    element: (
      <UnauthenticatedNav>
        <SignUp />
      </UnauthenticatedNav>
    ),
  },
]);

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
