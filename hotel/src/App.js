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
import Roomtable from "./pages/roomtable/RoomTable";
import HotelInfo from "./components/hotelinfor";

function App() {
  const isLoggedIn = localStorage.getItem('token'); // Kiểm tra token trong localStorage (hoặc context)
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang chủ mặc định */}
        <Route
                path="/"
                element={
                    isLoggedIn ? <Navigate to="/" /> : <Statistic />
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
        <Route path="/themphong" element={<CreateRoom/>}/>
        <Route path="/thongtin/:id" element={<Home/>}/>
        <Route path="/bangphong" element={<Roomtable/>}/>
        <Route path="/hotelinfor" element={<HotelInfo/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
