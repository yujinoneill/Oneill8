import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn, loggedInUsername } from "../utils/cookies";

const AdminRoute = () => {
  return isLoggedIn() && loggedInUsername() === "oneill" ? (
    <Outlet />
  ) : (
    <Navigate to="/" {...alert("관리자 권한이 필요해요!")} />
  );
};

export default AdminRoute;
