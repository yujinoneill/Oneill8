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

import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/place/:id" element={<Detail />} />
        <Route path="/place/new" element={<NewPlace />} />
        <Route path="/place/:id/edit" element={<EditPlace />} />
      </Routes>
    </BrowserRouter>
  );
}
