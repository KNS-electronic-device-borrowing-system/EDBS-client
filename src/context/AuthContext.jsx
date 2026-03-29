import { createContext, useContext, useEffect, useState } from "react";
import { getMeAPI } from "../services/userService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // get user info
  const fetchUser = async () => {
    try {
      const data = await getMeAPI(); 
      console.log("FETCH USER DATA:", data);
      setUser(data);
      return data;
    } catch (err) {
      console.log("GET ME ERROR:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // load user khi refresh
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
