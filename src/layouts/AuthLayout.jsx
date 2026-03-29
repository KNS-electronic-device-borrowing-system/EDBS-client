import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT - FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      {/* RIGHT - IMAGE */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-white relative overflow-hidden">
        {/* Background effect*/}
        <div className="absolute w-[400px] h-[400px] bg-blue-100 rounded-full blur-3xl opacity-60"></div>

        {/* Image*/}
        <img
          src="/auth-image.png"
          alt="auth"
          className="relative w-[420px] lg:w-[500px] xl:w-[700px] object-contain z-10"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
