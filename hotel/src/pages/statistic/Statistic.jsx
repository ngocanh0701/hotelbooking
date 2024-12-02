import React from "react";
import "./statistic.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

const data = [
  { id: "Hoàng Mai", name: "hoangmai", type: "0934728912", title: "201, 203", city: "20/10/2024", checkout:"24/20/2024" },
  
];

const App = () => {
  return (
    <div>
        <Navbar />
        <Header/>
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Tên Người đặt</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Phòng</th>
            <th>Ngày Check in</th>
            <th>Ngày Check out</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.title}</td>
              <td>{item.city}</td>
              <td>{item.checkout}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </div>
  );
};

export default App;
