import { Link, useLocation } from "react-router-dom";
import { Home, Users, Box, List, LogOut } from "lucide-react";
import UserInfo from "../common/UserInfo";

export default function AdminLayout() {
  const { pathname } = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Home },
    { name: "Quản Lý Người Dùng", path: "/admin/users", icon: Users },
    { name: "Quản Lý Thiết Bị", path: "/admin/assets", icon: Box },
    { name: "Danh Sách Yêu Cầu", path: "/admin/requests", icon: List }
  ];

  return (
    <div className="flex">
      <div className="w-64 fixed top-0 left-0 bg-white shadow-lg flex flex-col justify-between h-screen">
        {/* Menu */}
        <div className="px-4 py-6 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-3">
            {menu.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${isActive? "bg-gradient-to-r from-blue-200 to-blue-300 text-white shadow-md": "text-gray-700 hover:bg-blue-100 hover:text-blue-700"}`}
                >
                  <Icon
                    size={20}
                    className={`${isActive ? "text-white" : "text-blue-500"}`}
                  />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Admin Info */}
        <div>
          <UserInfo />
        </div>
      </div>
    </div>
  );
}
