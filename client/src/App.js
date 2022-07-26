import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Detail from "./pages/Detail";
import NewPlace from "./pages/NewPlace";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/place/:id" element={<Detail />} />
        <Route path="/place/new" element={<NewPlace />} />
      </Routes>
    </BrowserRouter>
  );
}
