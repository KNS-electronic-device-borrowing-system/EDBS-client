import axiosClient from "./axiosClient";
export const registerAPI = async (data) => {
  try {
    const res = await axiosClient.post("/auth/register", {
      email: data.email,
      password: data.password,
      fullName: data.fullName,
    });
    console.log("res", res.data);
    return res.data;
  } catch (err) {
    console.log("ERR", err);
    throw err.response?.data?.message || "Đăng ký thất bại";
  }
};

export const verifyEmailAPI = async (token) => {
  try {
    const res = await axiosClient.post("/auth/verify-email", { token: token });

    return res.data;
  } catch (err) {
    console.log("ERROR:", err.response);
    throw err.response?.data?.message || "Đăng ký thất bại";
  }
};

export const resendVerificationAPI = async (email) => {
  try {
    const res = await axiosClient.post("/auth/resend-verification", {
      email: email,
    });

    console.log("RESEND EMAIL RES:", res.data);
    return res.data;
  } catch (err) {
    console.log("RESEND EMAIL ERROR:", err.response);

    throw err.response?.data?.message || "Gửi lại email thất bại";
  }
};

export const loginAPI = async (data) => {
  try {
    const res = await axiosClient.post("/auth/login", {
      email: data.email,
      password: data.password,
    });
    console.log("LOGIN RES:", res.data);
    const result = res.data.data.user;
    console.log("USER INFO:", result);

    // Lưu token
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);

    return result;
  } catch (err) {
    console.log("LOGIN ERROR:", err.response);

    throw err.response?.data?.message || "Đăng nhập thất bại";
  }
};

export const refreshTokenAPI = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw "Không có refresh token";
    }

    const res = await axiosClient.post("/auth/refresh-token", {
      refreshToken: refreshToken,
    });

    console.log("REFRESH TOKEN RES:", res.data);

    const { accessToken, refreshToken: newRefreshToken } = res.data.data;

    // cập nhật token mới
    localStorage.setItem("accessToken", accessToken);

    if (newRefreshToken) {
      localStorage.setItem("refreshToken", newRefreshToken);
    }

    return accessToken;
  } catch (err) {
    console.log("REFRESH TOKEN ERROR:", err);

    throw err.response?.data?.message || "Refresh token thất bại";
  }
};

