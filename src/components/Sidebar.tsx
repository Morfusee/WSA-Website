import { useLocation } from "react-router-dom";
import { Colors } from "../utils/Colors";
import Logo from "../assets/images/logo.png";
import {
  Checkroom,
  Dashboard,
  LocalLaundryService,
  SvgIconComponent,
} from "@mui/icons-material";

function Sidebar() {
  return (
    <div
      className="w-1/2 max-w-60 h-full p-4 pt-0 flex flex-col gap-3"
      style={{
        backgroundColor: Colors.primary.dark,
      }}
    >
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
  return (
    <button
      className={
        "p-4 rounded-md font-semibold tracking-wider hover:bg-gray-600 " +
        (location.pathname === `/${displayText.toLowerCase()}`
          ? "text-gray-100"
          : "text-gray-300")
      }
      style={{
        backgroundColor:
          location.pathname === `/${displayText.toLowerCase()}`
            ? Colors.primary.main
            : "",
      }}
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

export default Sidebar;
