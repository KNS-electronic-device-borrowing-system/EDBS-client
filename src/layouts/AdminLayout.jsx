import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/layout/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 bg-gray-50 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
