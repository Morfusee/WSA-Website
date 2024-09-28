import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import {
  Checkroom,
  Dashboard,
  LocalLaundryService,
  SvgIconComponent,
} from "@mui/icons-material";

function Sidebar() {
  return (
    <div className="min-w-60 max-w-60 h-full p-4 pt-0 flex flex-col gap-3 bg-primary-dark">
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

export default Sidebar;
