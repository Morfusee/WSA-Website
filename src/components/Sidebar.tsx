import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import {
  Assignment,
  Checkroom,
  Class,
  Dashboard,
  Groups,
  Home,
  List,
  LocalLaundryService,
  Menu,
  Notifications,
  Quiz,
  Settings,
  SvgIconComponent,
} from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  SwipeableDrawer,
  Box,
  IconButton,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { Colors } from "../utils/Colors";

function Sidebar() {
  return (
    <div className="min-w-60 hidden md:flex max-w-60 h-full p-4 pt-0 flex-col gap-3 bg-primary-dark">
      <img src={Logo} alt="Logo" className="size-16 my-3" />
      <nav className="flex flex-col gap-2">
        <NavButtons displayText="Dashboard" Icon={Dashboard} />
        <NavButtons displayText="Wardrobe" Icon={Checkroom} />
        <NavButtons displayText="Laundry" Icon={LocalLaundryService} />
      </nav>
    </div>
  );
}

function NavButtons({
  displayText,
  Icon,
}: {
  displayText: string;
  Icon: SvgIconComponent;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${displayText.toLowerCase()}`);
  };

  return (
    <button
      className={
        "p-4 rounded-md font-semibold tracking-wider " +
        (location.pathname.includes(displayText.toLowerCase())
          ? "text-gray-100 bg-primary-main"
          : "text-gray-300 hover:bg-gray-600")
      }
      onClick={handleClick}
    >
      <div className="ml-auto">
        <span className="flex gap-2 items-center">
          <Icon />
          <h1 className="mt-0.5">{displayText}</h1>
        </span>
      </div>
    </button>
  );
}

export function MobileSidebar({
  state,
  setState,
}: {
  state: { left: boolean };
  setState: React.Dispatch<React.SetStateAction<{ left: boolean }>>;
}) {
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState({ ...state, left: open });
    };

  return (
    <Box className="mr-auto">
      <IconButton
        color="primary"
        sx={{
          "&:hover": {
            backgroundColor: Colors.background.default,
          },
          display: { md: "none" },
        }}
        onClick={() => setState({ left: true })}
      >
        <Menu htmlColor={Colors.primary.light} />
      </IconButton>
      {/* The swipeable drawer itself */}
      <SwipeableDrawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <div className="min-w-60 h-full p-4 pt-0 flex-col gap-3 bg-primary-dark">
            <img src={Logo} alt="Logo" className="size-16 my-3" />
            <nav className="flex flex-col gap-2">
              <NavButtons displayText="Dashboard" Icon={Dashboard} />
              <NavButtons displayText="Wardrobe" Icon={Checkroom} />
              <NavButtons displayText="Laundry" Icon={LocalLaundryService} />
            </nav>
          </div>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}

export default Sidebar;
