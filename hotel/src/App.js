import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import CreateRoom from "./pages/createRoom/CreateRoom";
import Statistic from "./pages/statistic/Statistic";

function App() {
  const isLoggedIn = localStorage.getItem('token'); // Kiểm tra token trong localStorage (hoặc context)
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang chủ mặc định */}
        <Route
                path="/"
                element={
                    isLoggedIn ? <Navigate to="/" /> : <Home />
                }
            />

            {/* Trang đăng nhập */}
            <Route path="/login" element={<Login />} />

            {/* Trang Home (sau khi đăng nhập) */}
            <Route
                path="/"
                element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
            />
        
        <Route path="/register" element={<Register/>}/>
        <Route path="/createRoom" element={<CreateRoom/>}/>
        <Route path="/thongke" element={<Statistic/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
