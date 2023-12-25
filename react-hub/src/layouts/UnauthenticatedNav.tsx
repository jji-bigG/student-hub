import React from "react";
import AppNavBase from "./AppNavBase";
import { Typography, ButtonGroup, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UnauthenticatedNav = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <AppNavBase
      AppbarButtons={() => (
        <>
          <Typography variant="h6" noWrap component="div">
            Student Hub - React Implementation
          </Typography>

          <ButtonGroup
            color="inherit"
            variant="text"
            sx={{ marginLeft: "auto" }}
          >
            <Button onClick={() => navigate("/auth")}>Login</Button>
            <Button onClick={() => navigate("/auth/signup")}>Sign Up</Button>
          </ButtonGroup>
        </>
      )}
      children={children}
      Drawer={() => <></>}
    />
  );
};

export default UnauthenticatedNav;
