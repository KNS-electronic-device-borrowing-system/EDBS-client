import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Register() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullname) {
      newErrors.fullname = "Vui lòng nhập họ tên";
    }

    if (!form.email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!form.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (form.password.length < 6) {
      newErrors.password = "Mật khẩu phải từ 6 ký tự";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear lỗi của field đang nhập
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateErrors = validate();

    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    console.log(form);
    navigate("/register/otp");
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Đăng Ký</h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Fullname */}
        <div className="mb-3">
          <input
            type="text"
            name="fullname"
            placeholder="Họ và tên"
            value={form.fullname}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md outline-none transition ${
              errors.fullname
                ? "border-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            }`}
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md outline-none transition ${
              errors.email
                ? "border-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-3 relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md pr-10 outline-none transition ${
              errors.password
                ? "border-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-3 relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Xác nhận mật khẩu"
            value={form.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md pr-10 outline-none transition ${
              errors.confirmPassword
                ? "border-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-2.5 text-gray-500"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Đăng ký
        </button>
      </form>

      {/* Google */}
      <button
        type="button"
        className="w-full mt-3 border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>

      <p className="text-sm text-center mt-6">
        Bạn đã có tài khoản?{" "}
        <span
          onClick={() => navigate("/")}
          className="text-blue-500 cursor-pointer"
        >
          Đăng nhập
        </span>
      </p>
    </div>
  );
}

export default Register;
