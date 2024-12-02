import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Reserve from "./pages/reserve/Reserve";
import CompleteBooking from "./components/completeBooking/CompleteBooking";
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
        <Route path="/hotels" element={<List/>}/>
        <Route path="/complete" element={<CompleteBooking/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/hotels/:id/reserve" element={<Reserve/>}/>
        <Route path="/hotels/:id/reserve/complete" element={<CompleteBooking/>}/>
        {/* <Route path="/login" element={<Login/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
