import axiosClient from "./axiosClient";
export const registerAPI = async (data) => {
  try {
    console.log("CALL REGISTER API", data);
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
    const res = await axiosClient.get(
      `/auth/register/verify-email?token=${token}`,
    );

    return res.data;
  } catch (err) {
    console.log("ERROR:", err.response);
    throw err.response?.data?.message || "Đăng ký thất bại";
  }
};

//mock api
export const loginAPI = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === "admin@gmail.com" && data.password === "123456") {
        resolve({
          data: {
            token: "fake-admin-token",
            user: {
              name: "Admin",
              email: data.email,
              role: "admin",
              avatar: "https://i.pravatar.cc/150?img=3",
            },
          },
        });
      } else if (
        data.email === "user@gmail.com" &&
        data.password === "123456"
      ) {
        resolve({
          data: {
            token: "fake-user-token",
            user: {
              name: "User",
              email: data.email,
              role: "user",
              avatar: "https://i.pravatar.cc/150?img=5",
            },
          },
        });
      } else {
        reject("Sai tài khoản hoặc mật khẩu");
      }
    }, 800);
  });
};

export const getMeAPI = () => {
  return new Promise((resolve) => {
    const user = JSON.parse(localStorage.getItem("user"));
    resolve({ data: user });
  });
};


