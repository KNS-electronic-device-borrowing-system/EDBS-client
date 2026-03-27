import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

// Auth pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import SuccessPage from "../pages/auth/SuccessPage";
import VerifyEmail from "../pages/auth/VerifyEmail";

// User pages
import HomePage from "../pages/user/HomePage";
import History from "../pages/user/History";
import Profile from "../pages/user/Profile";

// Admin pages
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Assets from "../pages/admin/Assets";
import Requests from "../pages/admin/Requests";


function AppRoutes() {
  return (
    <>
      <Routes>
        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/register/success" element={<SuccessPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* User */}
        <Route element={<UserLayout />}>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Admin */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/assets" element={<Assets />} />
          <Route path="/admin/requests" element={<Requests />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
