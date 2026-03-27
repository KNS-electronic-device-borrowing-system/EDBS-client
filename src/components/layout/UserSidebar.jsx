import { Link, useLocation } from "react-router-dom";
import { Home, History, User } from "lucide-react";
import UserInfo from "../common/UserInfo";

export default function UserSidebar() {
  const { pathname } = useLocation();

  const menu = [
    { name: "Trang chủ", path: "/homepage", icon: Home },
    { name: "Lịch sử mượn", path: "/history", icon: History },
    { name: "Trang cá nhân", path: "/profile", icon: User },
  ];

  return (
    <div className="w-64 fixed top-0 left-0 bg-white shadow-lg flex flex-col justify-between h-screen">
      {/* Top */}
      <div className="px-4 py-6">
        {/* Menu */}
        <div className="flex flex-col gap-3">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-200 to-blue-300 text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                }`}
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

      {/* Bottom */}
      <div>
        <UserInfo />
      </div>
    </div>
  );
}
