import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import AuthLayout from "../layouts/AuthLayout";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

// Auth pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
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
    <Routes>
      {/* ========== AUTH ========== */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* ========== USER ========== */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["Borrower", "Admin"]}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="assets" element={<Assets />} />
        <Route path="requests" element={<Requests />} />
      </Route>

      {/* ========== FALLBACK ========== */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default AppRoutes;
