import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserInfo() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const avatarUrl =
    user?.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.fullName || "User",
    )}`;

  return (
    <div className="p-4 border-t border-gray-200 bg-white rounded-t-lg shadow-inner">
      {/* User Info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <p className="text-sm font-semibold text-gray-800">
            {user?.fullName || "Unknown"}
          </p>
          <p className="text-xs text-gray-500">{user?.email || "No email"}</p>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 mt-4 px-3 py-2 w-full rounded-lg text-red-500 font-medium text-sm hover:bg-red-50 transition-colors duration-200"
      >
        <LogOut size={18} />
        Đăng xuất
      </button>
    </div>
  );
}
