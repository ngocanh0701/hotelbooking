// import {
//   faBed,
//   faCalendarDays,
//   faCar,
//   faPerson,
//   faPlane,
//   faTaxi,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "./header.css";
// import { DateRange } from "react-date-range";
// import { useContext, useState } from "react";
// import "react-date-range/dist/styles.css"; // main css file
// import "react-date-range/dist/theme/default.css"; // theme css file
// import { format } from "date-fns";
// import { enUS } from "date-fns/locale";

// import { useNavigate } from "react-router-dom";
// // import { SearchContext } from "../../context/SearchContext";
// import {SearchContext} from "../../context/SearchContext";
// import { AuthContext } from "../../context/AuthContext";

// const Header = ({ type }) => {
//   const [destination, setDestination] = useState("");
//   const [openDate, setOpenDate] = useState(false);
//   const [dates, setDates] = useState([
//     {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: "selection",
//     },
//   ]);
//   const [openOptions, setOpenOptions] = useState(false);
//   const [options, setOptions] = useState({
//     adult: 1,
//     children: 0,
//     room: 1,
//   });

//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);


//   const handleOption = (name, operation) => {
//     setOptions((prev) => {
//       return {
//         ...prev,
//         [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
//       };
//     });
//   };

//   const { dispatch } = useContext(SearchContext);

//   const handleSearch = () => {
//     dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
//     navigate("/hotels", { state: { destination, dates, options } });
//   };

//   return (
//     <div className="header">
//       <div
//         className={
//           type === "list" ? "headerContainer listMode" : "headerContainer"
//         }
//       >
//         <div className="headerList">
//           <div className="headerListItem active">
//             <FontAwesomeIcon icon={faBed} />
//             <span>Chỗ ở</span>
//           </div>
//           <div className="headerListItem">
//             <FontAwesomeIcon icon={faPlane} />
//             <span>Chuyến bay</span>
//           </div>
//           <div className="headerListItem">
//             <FontAwesomeIcon icon={faCar} />
//             <span>Taxi</span>
//           </div>
//           <div className="headerListItem">
//             <FontAwesomeIcon icon={faBed} />
//             <span>Danh lam thắng cảnh</span>
//           </div>
//           <div className="headerListItem">
//             <FontAwesomeIcon icon={faTaxi} />
//             <span>Taxi sân bay</span>
//           </div>
//         </div>
//         {type !== "list" && (
//           <>
//             <h1 className="headerTitle">
//             Một cuộc đời với những ưu đãi? Thật là tuyệt vời.
//             </h1>
//             <p className="headerDesc">
//             Nhận phần thưởng cho chuyến đi của bạn – mở khóa ngay tiết kiệm 10% hoặc hơn với tài khoản miễn phí.
//             </p>
//             {!user && <button className="headerBtn">Đăng nhập / Đăng kí</button>}
//             <div className="headerSearch">
//               <div className="headerSearchItem">
//                 <FontAwesomeIcon icon={faBed} className="headerIcon" />
//                 <input
//                   type="text"
//                   placeholder="Bạn muốn đến chỗ nào?"
//                   className="headerSearchInput"
//                   onChange={(e) => setDestination(e.target.value)}
//                 />
//               </div>
//               <div className="headerSearchItem">
//                 <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
//                 {/* <span
//                   onClick={() => setOpenDate(!openDate)}
//                   className="headerSearchText"
//                 >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
//                   dates[0].endDate,
//                   "MM/dd/yyyy"
//                 )}`}</span> */}
//                 <span
//                   onClick={() => setOpenDate(!openDate)}
//                   className="headerSearchText"
//                 >
//                   {dates?.[0]?.startDate && dates?.[0]?.endDate
//                     ? `${format(new Date(dates[0].startDate), "MM/dd/yyyy")} to ${format(
//                       new Date(dates[0].endDate),
//                       "MM/dd/yyyy"
//                     )}`
//                     : "Select Dates"}
//                 </span>


//                 {openDate && (
//                   <DateRange
//                     editableDateInputs={true}
//                     onChange={(item) => setDates([item.selection])}
//                     moveRangeOnFirstSelection={false}
//                     ranges={dates}
//                     className="date"
//                     locale={enUS}
//                     minDate={new Date()}
//                   />

//                 )}
//               </div>
//               <div className="headerSearchItem">
//                 <FontAwesomeIcon icon={faPerson} className="headerIcon" />
//                 <span
//                   onClick={() => setOpenOptions(!openOptions)}
//                   className="headerSearchText"
//                 >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
//                 {openOptions && (
//                   <div className="options">
//                     <div className="optionItem">
//                       <span className="optionText">Adult</span>
//                       <div className="optionCounter">
//                         <button
//                           disabled={options.adult <= 1}
//                           className="optionCounterButton"
//                           onClick={() => handleOption("adult", "d")}
//                         >
//                           -
//                         </button>
//                         <span className="optionCounterNumber">
//                           {options.adult}
//                         </span>
//                         <button
//                           className="optionCounterButton"
//                           onClick={() => handleOption("adult", "i")}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                     <div className="optionItem">
//                       <span className="optionText">Children</span>
//                       <div className="optionCounter">
//                         <button
//                           disabled={options.children <= 0}
//                           className="optionCounterButton"
//                           onClick={() => handleOption("children", "d")}
//                         >
//                           -
//                         </button>
//                         <span className="optionCounterNumber">
//                           {options.children}
//                         </span>
//                         <button
//                           className="optionCounterButton"
//                           onClick={() => handleOption("children", "i")}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                     <div className="optionItem">
//                       <span className="optionText">Room</span>
//                       <div className="optionCounter">
//                         <button
//                           disabled={options.room <= 1}
//                           className="optionCounterButton"
//                           onClick={() => handleOption("room", "d")}
//                         >
//                           -
//                         </button>
//                         <span className="optionCounterNumber">
//                           {options.room}
//                         </span>
//                         <button
//                           className="optionCounterButton"
//                           onClick={() => handleOption("room", "i")}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div className="headerSearchItem">
//                 <button className="headerBtn" onClick={handleSearch}>
//                   Search
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const [minPrice, setMinPrice] = useState(""); // Giá tối thiểu
  const [maxPrice, setMaxPrice] = useState(""); // Giá tối đa

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(SearchContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, dates, options, minPrice, maxPrice },
    });
    navigate("/hotels", { state: { destination, dates, options, minPrice, maxPrice } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Chỗ ở</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Chuyến bay</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Taxi</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Danh lam thắng cảnh</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Taxi sân bay</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              Một cuộc đời với những ưu đãi? Thật là tuyệt vời.
            </h1>
            <p className="headerDesc">
              Nhận phần thưởng cho chuyến đi của bạn – mở khóa ngay tiết kiệm 10%
              hoặc hơn với tài khoản miễn phí.
            </p>
            {!user && <button className="headerBtn">Đăng nhập / Đăng kí</button>}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Bạn muốn đến chỗ nào?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >
                  {dates?.[0]?.startDate && dates?.[0]?.endDate
                    ? `${format(new Date(dates[0].startDate), "MM/dd/yyyy")} to ${format(
                        new Date(dates[0].endDate),
                        "MM/dd/yyyy"
                      )}`
                    : "Select Dates"}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    locale={enUS}
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Thêm trường nhập giá tối thiểu */}
              <div className="headerSearchItem">
                <input
                  type="number"
                  placeholder={minPrice ? `${minPrice}.000` : "Nhập giá tối thiểu"}
                  className="headerSearchInput"
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>

              {/* Thêm trường nhập giá tối đa */}
              <div className="headerSearchItem">
                <input
                  type="number"
                  placeholder={maxPrice ? `${maxPrice}.000` : "Nhập giá tối đa"}
                  className="headerSearchInput"
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

