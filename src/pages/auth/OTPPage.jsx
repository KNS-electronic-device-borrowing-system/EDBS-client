import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function OTPPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (e, index) => {
    let value = e.target.value;

    // chỉ lấy số
    value = value.replace(/\D/g, "");

    setOtp((prev) => {
      const next = [...prev];

      if (!value) {
        next[index] = "";
        return next;
      }

      const digit = value[value.length - 1];
      next[index] = digit;

      return next;
    });

    if (index < 5) {
      setTimeout(() => {
        inputsRef.current[index + 1]?.focus();
      }, 0);
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!paste) return;

    setOtp((prev) => {
      const next = [...prev];
      let i = index;
      for (const ch of paste) {
        if (i > 5) break;
        next[i] = ch;
        i += 1;
      }
      return next;
    });

    const focusIndex = Math.min(5, index + paste.length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      setOtp((prev) => {
        const newOtp = [...prev];

        if (prev[index]) {
          newOtp[index] = "";
          return newOtp;
        }

        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
          newOtp[index - 1] = "";
        }

        return newOtp;
      });
    }
  };

  const handleSubmit = async () => {
    const code = otp.join("");

    if (code.length < 6) {
      setError("Vui lòng nhập đầy đủ 6 số OTP");
      return;
    }

    setLoading(true);
    setError("");

    // Fake API delay
    setTimeout(() => {
      setLoading(false);

      // fake logic: đúng OTP là 123456
      if (code !== "123456") {
        setError("Mã OTP không đúng. Vui lòng thử lại");
      } else {
        alert("Xác thực thành công!");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-white">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-[400px] text-center border border-gray-100">
        <Link
          to="/register"
          className="text-left text-sm text-gray-500 mb-3 cursor-pointer hover:text-black transition block"
        >
          ← Quay lại
        </Link>

        <h2 className="text-2xl font-semibold mb-2">Xác thực mã OTP</h2>
        <p className="text-gray-500 text-sm mb-5">
          Nhập mã gồm 6 chữ số đã gửi tới <br />
          <span className="font-medium text-black">email@gmail.com</span>
        </p>

        <div className="flex justify-between gap-2 mb-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onFocus={(e) => e.target.select()}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e, index)}
              className={`w-12 h-14 border rounded-xl text-center text-xl font-semibold focus:outline-none focus:ring-2 transition ${
                error
                  ? "border-red-400 focus:ring-red-400"
                  : "focus:ring-blue-400 focus:border-blue-400"
              }`}
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="flex justify-between items-center text-sm mb-5">
          <span className="text-gray-400">
            {timeLeft > 0 ? `Gửi lại sau ${timeLeft}s` : "Bạn có thể gửi lại"}
          </span>
          <button
            disabled={timeLeft > 0}
            className={`font-medium ${
              timeLeft > 0
                ? "text-gray-300 cursor-not-allowed"
                : "text-blue-500 hover:underline"
            }`}
          >
            Gửi lại
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:opacity-90 transition shadow-md flex items-center justify-center gap-2"
        >
          {loading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {loading ? "Đang xác thực..." : "Tiếp tục"}
        </button>
      </div>
    </div>
  );
}
