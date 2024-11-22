import "./completeBooking.css";
import { useNavigate } from "react-router-dom";
const CompleteBooking = () => {

    const navigate = useNavigate();
    const handleClick = async (e) => {
        e.preventDefault();
        try {
          navigate("/");  // Điều hướng đến trang dành cho người dùng
        } catch (err) {
        //   dispatch({ payload: err.response.data });
        console.log('loi')
        }
      };
    
  return (
    <div className="main">
        <div className="container">
            <p className="item">Banj da dat phong thanh cong</p>
            <button className="item" type='button' onClick={handleClick}>Về Trang chủ</button>
        </div>
        
    </div>
   
  );
};

export default CompleteBooking;
