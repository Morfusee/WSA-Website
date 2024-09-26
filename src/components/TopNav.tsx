import { Avatar, IconButton } from "@mui/material";
import { Colors } from "../utils/Colors";
import { Notifications } from "@mui/icons-material";

function TopNav() {
  return (
    <div
      className="w-full flex items-center justify-end gap-1 p-3"
      style={{
        backgroundColor: Colors.primary.dark,
      }}
    >
      <IconButton color="primary">
        <Notifications htmlColor={Colors.primary.light} />
      </IconButton>
      <IconButton color="primary">
        <Avatar sx={{ height: "1.7rem", width: "1.7rem" }} />
      </IconButton>
    </div>
  );
}

export default TopNav;
