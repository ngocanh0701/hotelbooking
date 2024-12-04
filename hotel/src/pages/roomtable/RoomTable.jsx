// import React from "react";
// import "./roomtable.css";
// import Navbar from "../../components/navbar/Navbar";
// import Footer from "../../components/footer/Footer";
// import Header from "../../components/header/Header";
// import { Link} from "react-router-dom";
// import { useEffect, useState } from "react";
// import useFetch from "../../hooks/useFetch";
// import { baseAPI } from "../../hooks/utils";

// const Roomtable = () => {
//   const [list, setList] = useState();
//   const { data, loading, error } = useFetch(`${baseAPI}/rooms`);

//   useEffect(() => {
//     setList(data);
//   }, [data]);

//     const rooms = [
//         { title: data.title, description: 'Giường lớn, 1 phòng tắm', price: 100, maxPeople: 2 },
//         // { title: data.title, description: '2 Giường lớn, 1 phòng khách,...', price: 500, maxPeople: 4 },
//         { title: data.title, description: 'Giường lớn, 1 Phòng tắm', price: 100, maxPeople: 2 },
//       ];

//   return (
//     <div>
//         <Navbar />
//         <Header/>
//         <div className="room-table">
//       <button className="add-button"><Link to="/themphong">Add new</Link></button>
//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Max People</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rooms.map((room, index) => (
//             <tr key={index}>
//               <td>{room.title}</td>
//               <td>{room.description}</td>
//               <td>{room.price}</td>
//               <td>{room.maxPeople}</td>
//               <td>
//                 <span className="action view">View</span>
//                 <span className="action delete">Delete</span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     <Footer/>
//     </div>
//   );
// };

// export default Roomtable;

import React, { useEffect, useState } from "react";
import "./roomtable.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { baseAPI } from "../../hooks/utils";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Roomtable = () => {
  const {user } = useContext(AuthContext);
  console.log(user);
  const { data1, loading1, error1 } = useFetch(`${baseAPI}/hotels/find/${user.hotelid}`);
  const [rooms, setRooms] = useState([]);
  const [loading2, setLoading2] = useState(true);
  const [error2, setError2] = useState(null);

  useEffect(() => {
    if (data1) {
      const roomIds = data1.roomIds; // Giả sử bạn nhận được danh sách ID phòng từ data1

      // Gọi API cho từng phòng để lấy thông tin chi tiết
      const fetchRooms = async () => {
        try {
          const roomPromises = roomIds.map((roomId) => 
            fetch(`${baseAPI}/rooms/find/${roomId}`).then((res) => res.json())
          );
          
          const roomsData = await Promise.all(roomPromises);
          setRooms(roomsData); // Lưu thông tin các phòng vào state
        } catch (error) {
          setError2(error);
        } finally {
          setLoading2(false);
        }
      };

      fetchRooms();
    }
  }, [data1]); // Chạy lại khi data1 thay đổi

  return (
    <div>
      <Navbar />
      <Header />
      <div className="room-table">
        <button className="add-button">
          <Link to="/themphong">Add new</Link>
        </button>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Max People</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length > 0 ? (
              rooms.map((room, index) => (
                <tr key={index}>
                  <td>{room.title}</td>
                  <td>{room.description}</td>
                  <td>{room.price}</td>
                  <td>{room.maxPeople}</td>
                  <td>
                    <span className="action view">View</span>
                    <span className="action delete">Delete</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No rooms available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default Roomtable;
