import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmailAPI } from "../../services/authService";
import { CheckCircle, XCircle } from "lucide-react";

export default function VerifyEmailPage() {
  const [statusMessage, setStatusMessage] = useState("Đang xác thực...");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token"); // lấy token từ query string
    if (!token) {
      setStatusMessage("Token không hợp lệ!");
      setLoading(false);
      setSuccess(false);
      return;
    }

    const verify = async () => {
      try {
        setStatusMessage("Đang xác thực email...");
        const res = await verifyEmailAPI(token); // gọi API xác thực
        setStatusMessage(res.message || "Xác thực email thành công!");
        setSuccess(true);
      } catch (err) {
        setStatusMessage(err || "Xác thực thất bại!");
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-white relative overflow-hidden">
      {/* Background blur circles */}
      <div className="absolute w-[500px] h-[500px] bg-blue-400 opacity-20 rounded-full blur-3xl top-[-150px] left-[-150px]"></div>
      <div className="absolute w-[480px] h-[400px] bg-blue-500 opacity-10 rounded-full blur-3xl bottom-[-100px] right-[-100px]"></div>

      <div className="relative bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-[480px] text-center border border-white/40">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div
            className={`p-4 rounded-full ${
              success ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {success ? (
              <CheckCircle className="w-10 h-10 text-green-500" />
            ) : (
              <XCircle className="w-10 h-10 text-red-500" />
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {loading
            ? "Đang xác thực..."
            : success
              ? "Xác thực email thành công!"
              : "Xác thực thất bại!"}
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          {loading
            ? "Vui lòng chờ trong giây lát..."
            : success
              ? "Tài khoản của bạn đã được kích hoạt thành công.\nHãy quay lại trang đăng nhập để bắt đầu sử dụng dịch vụ.\nChúng tôi chúc bạn có trải nghiệm tuyệt vời!"
              : "Email không thể xác thực. Vui lòng kiểm tra lại link hoặc thử gửi lại email xác nhận."}
        </p>

        {/* Loading Spinner */}
        {loading && (
          <div className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 mx-auto mb-6"></div>
        )}

        {/* Button */}
        {!loading && (
          <button
            onClick={() => navigate("/")}
            className={`w-full py-3 rounded-xl ${
              success
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                : "bg-gradient-to-r from-red-500 to-red-600 text-white"
            } font-medium hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg`}
          >
            {success ? "Quay lại đăng nhập" : "Thử lại"}
          </button>
        )}

        {/* Extra note */}
        {!loading && success && (
          <p className="text-xs text-gray-400 mt-5">
            Nếu không nhận được email, hãy kiểm tra hộp thư spam hoặc yêu cầu
            gửi lại.
          </p>
        )}
      </div>
    </div>
  );
}
