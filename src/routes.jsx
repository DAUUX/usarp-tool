import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/home";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="cadastro" element={<Register />} />
        <Route path="home" element={<Home />} />
        <Route
          path="*"
          element={
            <center>
              <h1>
                Em manutenção <br />
                🤡
              </h1>
            </center>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
