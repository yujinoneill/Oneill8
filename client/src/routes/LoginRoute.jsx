import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../utils/cookies";

const LoginRoute = () => {
  return isLoggedIn() ? (
    <Outlet />
  ) : (
    <Navigate to="/" {...alert("로그인이 필요해요!")} />
  );
};

export default LoginRoute;
