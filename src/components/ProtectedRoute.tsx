import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

function ProtectedRoute() {
  return (
    <div className="flex scroller w-full h-screen overflow-hidden divide-x divide-gray-700">
      <Sidebar />
      <div className="flex flex-col h-full w-full">
        <TopNav />
        <Outlet />
      </div>
    </div>
  );
}

export default ProtectedRoute;
