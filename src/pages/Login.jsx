function Login() {
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Đăng Nhập</h2>

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Button */}
      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
        Log In
      </button>

      {/* Google */}
      <button className="w-full mt-3 border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>

      {/* Forgot */}
      <p className="text-sm text-blue-500 mt-3 text-center cursor-pointer">
        Quên mật khẩu?
      </p>

      {/* Register */}
      <p className="text-sm text-center mt-2">
        Bạn chưa có tài khoản?{" "}
        <span className="text-blue-500 cursor-pointer">Đăng Ký</span>
      </p>
    </div>
  );
}

export default Login;
