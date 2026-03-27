import axiosClient from "./axiosClient";

export const getMeAPI = async () => {
  try {
    const res = await axiosClient.get("/users/me");
    console.log("GET ME RES:", res.data);
    return res.data.data; 
  } catch (err) {
    throw err.response?.data?.message || "Lấy thông tin user thất bại";
  }
};
