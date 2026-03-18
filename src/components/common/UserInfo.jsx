import { LogOut } from "lucide-react";

export default function UserInfo() {
  return (
    <div className="p-4 border-t border-gray-200 bg-white rounded-t-lg shadow-inner">
      {/* User Info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <img
          src="https://i.pravatar.cc/150?img=3" 
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-gray-800">SE190000</p>
          <p className="text-xs text-gray-500">email@gmail.com</p>
        </div>
      </div>

      {/* Logout Button */}
      <button className="flex items-center gap-2 mt-4 px-3 py-2 w-full rounded-lg text-red-500 font-medium text-sm hover:bg-red-50 transition-colors duration-200">
        <LogOut size={18} />
        Đăng xuất
      </button>
    </div>
  );
}
