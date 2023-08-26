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
import Navigation from "./layouts/Navigation.tsx";
import MiniDrawer from "./layouts/MiniDrawer.tsx";
import SignUp from "./pages/auth/SignUp.tsx";

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <MiniDrawer>
        <App />
      </MiniDrawer>
    ),
  },
  {
    path: "/auth",
    element: <SignIn />,
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
]);

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>
);
