import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

import Login from "../pages/auth/Login";

// User pages
import HomePage from "../pages/user/HomePage";
import History from "../pages/user/History";
import Profile from "../pages/user/Profile";

// Admin pages
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Assets from "../pages/admin/Assets";
import Requests from "../pages/admin/Requests";
import Brands from "../pages/admin/Brands";
import Categories from "../pages/admin/Categories";

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
        </Route>

        {/* User */}
        <Route element={<UserLayout />}>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="assets" element={<Assets />} />
          <Route path="requests" element={<Requests />} />
          <Route path="brands" element={<Brands />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
