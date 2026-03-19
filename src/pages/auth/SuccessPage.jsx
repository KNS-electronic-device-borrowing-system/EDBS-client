import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 via-blue-100 to-white relative overflow-hidden">
      {/* background blur effect */}
      <div className="absolute w-[500px] h-[500px] bg-blue-400 opacity-20 rounded-full blur-3xl top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[480px] h-[400px] bg-blue-500 opacity-10 rounded-full blur-3xl bottom-[-100px] right-[-100px]"></div>

      <div className="relative bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-[480px] text-center border border-white/40">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="p-4 rounded-full bg-green-100">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Tạo tài khoản thành công!
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          Tài khoản của bạn đã sẵn sàng sử dụng.
          <br />
          Hãy quay lại trang đăng nhập để bắt đầu trải nghiệm.
          <br />
          Chúc bạn có một hành trình tuyệt vời cùng hệ thống!
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg"
        >
          Quay lại đăng nhập
        </button>

        {/* Extra */}
        <p className="text-xs text-gray-400 mt-5">
          Bạn có thể đăng nhập ngay để bắt đầu sử dụng dịch vụ
        </p>
      </div>
    </div>
  );
}
