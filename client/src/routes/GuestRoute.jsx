import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../utils/cookies";

const GuestRoute = () => {
  return !isLoggedIn() ? <Outlet /> : <Navigate to="/" />;
};

export default GuestRoute;
