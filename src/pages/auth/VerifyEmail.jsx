import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  verifyEmailAPI,
  resendVerificationAPI,
} from "../../services/authService";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function VerifyEmailPage() {
  const [statusMessage, setStatusMessage] = useState("Đang xác thực...");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(0);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [inputEmail, setInputEmail] = useState("");

  // Verify email
  useEffect(() => {
    const token = searchParams.get("token");
    const emailParam = searchParams.get("email");

    if (emailParam) setEmail(emailParam);

    if (!token) {
      setStatusMessage("Link đã hết hạn hoặc không hợp lệ.");
      setLoading(false);
      setSuccess(false);
      return;
    }

    const verify = async () => {
      try {
        setStatusMessage("Đang xác thực email...");
        const res = await verifyEmailAPI(token);
        setStatusMessage(res.message || "Xác thực email thành công!");
        setSuccess(true);
      } catch (err) {
        setStatusMessage(
          err || "Link đã hết hạn hoặc không hợp lệ. Vui lòng thử lại.",
        );
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [searchParams]);

  // Countdown resend
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  //  Resend email
  const handleResend = async () => {
    const emailToUse = email || inputEmail;

    if (!emailToUse) {
      toast.error("Vui lòng nhập email!");
      setStatusMessage("Hãy nhập email để gửi lại xác thực.");
      return;
    }

    // validate email basic
    const isValidEmail = /\S+@\S+\.\S+/.test(emailToUse);
    if (!isValidEmail) {
      toast.error("Email không hợp lệ!");
      return;
    }

    try {
      await resendVerificationAPI(emailToUse);

      toast.success("Đã gửi lại email xác thực!");
      setStatusMessage(
        " Email xác thực đã được gửi lại. Vui lòng kiểm tra hộp thư.",
      );

      setCountdown(30);
    } catch (err) {
      const message = err || "Gửi lại email thất bại!";
      toast.error(message);
      setStatusMessage(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-white relative overflow-hidden">
      {/* Background */}
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

        {/* Message */}
        <p className="text-gray-500 text-sm whitespace-pre-line mb-6">
          {loading
            ? "Vui lòng chờ trong giây lát..."
            : success
              ? `Tài khoản của bạn đã được kích hoạt thành công.\n Hãy quay lại trang đăng nhập để bắt đầu trải nghiệm.`
              : statusMessage}
        </p>

        {/* Loading */}
        {loading && (
          <div className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 mx-auto mb-6"></div>
        )}
        {/* INPUT EMAIL khi fail */}
        {!loading && !success && !email && (
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            className="w-full mb-3 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        )}
        {/* Actions */}
        {!loading && (
          <div className="flex flex-col gap-3 mt-2">
            {/* FAIL */}
            {!success && (
              <button
                onClick={handleResend}
                disabled={countdown > 0}
                className={`w-full py-3 rounded-xl font-medium transition-all ${
                  countdown > 0
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600 shadow-md"
                }`}
              >
                {countdown > 0
                  ? `Gửi lại sau ${countdown}s`
                  : "Gửi lại email xác thực"}
              </button>
            )}

            {/* LOGIN BUTTON (luôn có) */}
            <button
              onClick={() => navigate("/")}
              className={`w-full py-3 rounded-xl font-medium transition-all ${
                success
                  ? "bg-green-500 text-white hover:bg-green-600 shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Quay lại đăng nhập
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
