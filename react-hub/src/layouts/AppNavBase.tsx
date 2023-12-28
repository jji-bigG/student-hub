import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface Props {
  AppbarButtons: React.ComponentType<{
    handleDrawerOpen: VoidFunction;
    handleDrawerClose?: VoidFunction;
  }>;
  Drawer: React.ComponentType<{
    handleDrawerOpen?: VoidFunction;
    handleDrawerClose: VoidFunction;
  }>;
  children: React.ReactNode;
}

export default function AppNavBase({ AppbarButtons, Drawer, children }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline /> */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <AppbarButtons handleDrawerOpen={() => setOpen(true)} />
        </Toolbar>
      </AppBar>

      <Drawer
        handleDrawerClose={() => setOpen(false)}
        handleDrawerOpen={() => setOpen(true)}
      />

      <Box component="main" sx={{ flexGrow: 1, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
}
