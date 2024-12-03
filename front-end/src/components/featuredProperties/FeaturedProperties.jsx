import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import { baseAPI } from "../../hooks/utils";

const FeaturedProperties = () => {
  const { data, loading } = useFetch(`${baseAPI}/hotels?featured=true&limit=4`);

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Giá chỉ với ${item.cheapestPrice}</span>
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Tuyệt vời</span>
              </div>}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
