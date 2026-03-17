import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* LEFT - FORM */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <Outlet />
      </div>

      {/* RIGHT - IMAGE */}
      <div className="w-1/2 hidden lg:flex items-center justify-center bg-blue-50">
        <img
          src="/auth-image.png" 
          alt="auth"
          className="max-w-md"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
