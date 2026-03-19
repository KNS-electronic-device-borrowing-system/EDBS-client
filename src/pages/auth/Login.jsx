import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!form.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear lỗi field
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateErrors = validate();
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    setLoading(true);

    try {
      console.log("DATA LOGIN:", form);

      // 👉 call API ở đây
      // navigate("/homepage");
    } catch (err) {
      setErrors({ general: "Đăng nhập thất bại!" });
    } finally {
      setLoading(false);
    }
  };

  // 👉 class dùng chung
  const inputClass = (error) =>
    `w-full px-4 py-2 border rounded-md outline-none pr-10 transition-all duration-200 ${
      error
        ? "border-red-500 focus:ring-2 focus:ring-red-300 focus:border-red-500"
        : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-md bg-white p-8 rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Đăng Nhập</h2>

      {/* Email */}
      <div className="mb-3">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className={inputClass(errors.email)}
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
          value={form.password}
          onChange={handleChange}
          placeholder="Mật khẩu"
          className={inputClass(errors.password)}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {/* General error */}
      {errors.general && (
        <p className="text-red-500 text-sm text-center mb-3">
          {errors.general}
        </p>
      )}

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
      </button>

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

      {/* Forgot */}
      <p className="text-sm text-blue-500 mt-3 text-center cursor-pointer">
        Quên mật khẩu?
      </p>

      {/* Register */}
      <p className="text-sm text-center mt-4">
        Bạn chưa có tài khoản?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-blue-500 cursor-pointer"
        >
          Đăng Ký
        </span>
      </p>
    </form>
  );
}

export default Login;
