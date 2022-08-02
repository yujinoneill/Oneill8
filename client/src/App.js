import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Pages
import Places from "./pages/place/Places";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Detail from "./pages/place/Detail";
import NewPlace from "./pages/place/NewPlace";
import EditPlace from "./pages/place/EditPlace";
import MyPage from "./pages/user/MyPage";

// Routes
import AdminRoute from "./routes/AdminRoute";
import LoginRoute from "./routes/LoginRoute";
import GuestRoute from "./routes/GuestRoute";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* 모두에게 열려있는 페이지 */}
        <Route path="/place" element={<Places />} />
        <Route path="/place/:id" element={<Detail />} />

        {/* 게스트에게만 열려있는 페이지 */}
        <Route element={<GuestRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* 로그인이 필요한 페이지 */}
        <Route element={<LoginRoute />}>
          <Route path="/mypage" element={<MyPage />} />
        </Route>

        {/* 관리자 권한이 필요한 페이지 */}
        <Route element={<AdminRoute />}>
          <Route path="/place/new" element={<NewPlace />} />
          <Route path="/place/:id/edit" element={<EditPlace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
