import React from "react";
import "./statistic.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

const data = [
  { id: "672d451a4701457f52e97f40", name: "hotel toan Quang u...", type: "hotel", title: "Best Hotel in the city", city: "berlin" },
  { id: "67337264e0d50bbd1d17fc93", name: "Hotel HOA HOA 5", type: "hotel", title: "Best Hotel in the city", city: "london" },
  { id: "67337268e0d50bbd1d17fc95", name: "Hotel HOA HOA 6", type: "hotel", title: "Best Hotel in the city", city: "london" },
  { id: "673dccff20277a533bdadaf7", name: "Hoang Hoang Hotel", type: "khach san", title: "dsadasda", city: "Hà Nội" },
  { id: "673dcd0120277a533bdadafd", name: "Hoang Hoang Hotel", type: "khach san", title: "dsadasda", city: "Hà Nội" },
  { id: "673dcd0120277a533bdadaff", name: "Hoang Hoang Hotel", type: "khach san", title: "dsadasda", city: "Hà Nội" },
  { id: "673dcd0120277a533bdadb01", name: "Hoang Hoang Hotel", type: "khach san", title: "dsadasda", city: "Hà Nội" },
  { id: "673dcd0020277a533bdadaf9", name: "Hoang Hoang Hotel", type: "khach san", title: "dsadasda", city: "Hà Nội" },
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
            <th>ten nguoi dat</th>
            <th>email</th>
            <th>phone</th>
            <th>phong</th>
            <th>ngay check in</th>
            <th>ngay check out</th>
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
