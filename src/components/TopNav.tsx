import {
  Avatar,
  Box,
  colors,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Popover,
} from "@mui/material";
import { Colors } from "../utils/Colors";
import { Logout, Notifications, Person } from "@mui/icons-material";
import { useState } from "react";
import { MobileSidebar } from "./Sidebar";
import { useNavigate } from "react-router-dom";

function TopNav() {
  const [openSidebar, setOpenSidebar] = useState({ left: false });

  return (
    <div
      className="w-full flex items-center justify-end gap-1 p-3"
      style={{
        backgroundColor: Colors.primary.dark,
      }}
    >
      <MobileSidebar setState={setOpenSidebar} state={openSidebar} />
      <NotificationMenu />
      <ProfileMenu />
    </div>
  );
}

function NotificationMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <IconButton
        color="primary"
        sx={{
          "&:hover": {
            backgroundColor: Colors.background.default,
          },
        }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Notifications htmlColor={Colors.primary.light} />
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box className="flex flex-col items-center justify-center size-64 gap-2">
          <Notifications htmlColor={colors.grey[400]} fontSize="large"/>
          <p className="text-gray-300 font-semibold tracking-wide">No new notifications</p>
        </Box>
      </Menu>
    </>
  );
}

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <IconButton
        color="primary"
        sx={{
          "&:hover": {
            backgroundColor: Colors.background.default,
          },
        }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Avatar sx={{ height: "1.7rem", width: "1.7rem" }} />
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          sx={{
            py: 0.75,
            minHeight: 0,
          }}
          onClick={handleLogout}
        >
          <ListItemIcon>
            <Logout
              fontSize="small"
              sx={{
                color: "rgba(239, 68, 68, 1)",
              }}
            />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default TopNav;
