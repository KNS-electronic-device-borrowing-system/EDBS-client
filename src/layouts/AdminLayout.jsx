import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/layout/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
  {/* Sidebar — fixed width */}
  <aside className="w-64 shrink-0 h-full overflow-y-auto bg-white border-r border-gray-200">
    <AdminSidebar />
  </aside>

  {/* Main content */}
  <main className="flex-1 min-w-0 bg-gray-50 p-6 overflow-auto">
    <Outlet />
  </main>
</div>
  );
}
