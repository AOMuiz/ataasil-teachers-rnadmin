import * as React from "react";
import {
  DashboardMenuItem,
  MenuItemLink,
  useRedirect,
  useSidebarState,
} from "react-admin";

import { Box, useMediaQuery } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const Menu = () => {
  const redirect = useRedirect();
  const [open] = useSidebarState();

  return (
    <Box
      sx={{
        width: open ? 200 : 50,
        marginTop: 1,
        marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <DashboardMenuItem />

      <MenuItemLink
        to="/edit-profile"
        primaryText="تعديل الملف الشخصي"
        leftIcon={<SettingsIcon />}
        onClick={() => {
          redirect("/edit-profile");
        }}
        placeholder={undefined}
      />
    </Box>
  );
};

export default Menu;
