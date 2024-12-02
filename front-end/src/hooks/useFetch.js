// import { useEffect, useState } from "react";
// import axios from "axios";


// const useFetch = (url) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [normalizedUrl, setNormalizedUrl] = useState(url);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(normalizedUrl);
//         setData(res.data);
//       } catch (err) {
//         setError(err);
//       }
//       setLoading(false);
//     };
//     fetchData();
//   }, [normalizedUrl]);

//   const reFetch = async (newUrl) => {
//     setNormalizedUrl(newUrl);
//     setLoading(true);
//     try {
//       const res = await axios.get(newUrl);
//       setData(res.data);
//     } catch (err) {
//       setError(err);
//     }
//     setLoading(false);
//   };

//   return { data, loading, error, reFetch };
// };

// export default useFetch;

import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [normalizedUrl, setNormalizedUrl] = useState(url);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log(`Fetching data from: ${normalizedUrl}`); // Log the URL
      try {
        const res = await axios.get(normalizedUrl);
        console.log('Response data:', res.data); // Log the response data
        setData(res.data);
      } catch (err) {
        console.error('Error fetching data:', err); // Log the error
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [normalizedUrl]);
  

  const reFetch = async (newUrl) => {
    setNormalizedUrl(newUrl);
    setLoading(true);
    console.log(`Re-fetching data from: ${newUrl}`); // Log the new URL
    try {
      const res = await axios.get(newUrl);
      console.log('Re-fetch response data:', res.data); // Log the response data
      setData(res.data);
    } catch (err) {
      console.error('Error re-fetching data:', err); // Log the error
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
