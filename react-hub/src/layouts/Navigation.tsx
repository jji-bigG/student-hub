import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  CssBaseline,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import React, { useState } from "react";
// import SwipeableEdgeDrawer from "../components/navigation/SwipeableEdgeDrawer";
// import MiniDrawer from "../components/navigation/MiniDrawer";

interface Props {
  children: React.ReactNode;
}

export default function Navigation({ children }: Props) {
  const [value, setValue] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      {/* <SwipeableEdgeDrawer /> */}
      {/* <MiniDrawer open={isDrawerOpen} setOpen={setIsDrawerOpen} /> */}
      {children}
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </>
  );
}
