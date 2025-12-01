import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PasswordRecover from "../pages/PasswordRecover";
import ResetPassword from "../pages/PasswordRecover/ResetPassword";

export function UnloggedRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="cadastro" element={<Register />} />
      <Route path="recover" element={<PasswordRecover />} />
      <Route path="auth/reset_password/:userId/:token" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
