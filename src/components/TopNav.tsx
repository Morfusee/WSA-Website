import { Avatar, IconButton } from "@mui/material";
import { Colors } from "../utils/Colors";
import { Notifications } from "@mui/icons-material";
import { useState } from "react";
import { MobileSidebar } from "./Sidebar";

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
      <IconButton
        color="primary"
        sx={{
          "&:hover": {
            backgroundColor: Colors.background.default,
          },
        }}
      >
        <Notifications htmlColor={Colors.primary.light} />
      </IconButton>
      <IconButton
        color="primary"
        sx={{
          "&:hover": {
            backgroundColor: Colors.background.default,
          },
        }}
      >
        <Avatar sx={{ height: "1.7rem", width: "1.7rem" }} />
      </IconButton>
    </div>
  );
}

export default TopNav;
