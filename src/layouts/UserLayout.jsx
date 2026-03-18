import { Outlet } from "react-router-dom";
import UserSidebar from "../components/layout/UserSidebar";

export default function UserLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
