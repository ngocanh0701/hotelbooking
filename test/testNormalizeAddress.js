const normalizeAddress = (address) => {
    if (!address) return "";
  
    return address
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
      .replace(/đ/g, "d") // Thay thế đ thành d
      .replace(/[^\w\s]/g, "") // Loại bỏ dấu câu
      .replace(/\s+/g, " ") // Chuẩn hóa khoảng trắng
      .trim(); // Loại bỏ khoảng trắng ở đầu và cuối
  };
  
  // Dữ liệu danh sách địa chỉ có sẵn
  const addresses = [
    "Số 4, đường Trần Phú, Quận Hải Châu, Đà Nẵng, Việt Nam",
    "Hà Nội",
    "TP. Hồ Chí Minh",
    "Cần Thơ",
    "Huế",
    "Số 123, đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
  ];
  
  // Hàm tìm kiếm địa chỉ theo từ khóa
  const searchAddress = (query, data) => {
    const normalizedQuery = normalizeAddress(query);
    const queryWords = normalizedQuery.split(" "); // Tách từ khóa thành các từ riêng lẻ
  
    return data.filter((address) => {
      const normalizedData = normalizeAddress(address);
      // Đảm bảo tất cả từ trong từ khóa phải xuất hiện trong địa chỉ
      return queryWords.every((word) => normalizedData.includes(word));
    });
  };
  
  // Test tìm kiếm
  const testSearches = [
    "hải châu đà nẵng",
    "trần phú, hải châu đà nẵng",
    "hải châu, đà nẵng",
    "Hồ Chí Minh",
    "Hà Nội",
    "Huế",
    "da nang",
    "quan 1 ho chi minh",
  ];
  testSearches.forEach((searchQuery) => {
    const results = searchAddress(searchQuery, addresses);
    console.log(`Tìm kiếm: "${searchQuery}"`);
    console.log("Kết quả:", results.length ? results : "Không tìm thấy kết quả");
    console.log("-----------------------");
  });
  
// Hàm chuẩn hóa địa chỉ
// const normalizeAddress = (address) => {
//     if (!address) return "";
  
//     return address
//       .toLowerCase()
//       .normalize("NFD")
//       .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
//       .replace(/đ/g, "d") // Thay thế đ thành d
//       .replace(/[^\w\s]/g, "") // Loại bỏ dấu câu
//       .replace(/\s+/g, " ") // Chuẩn hóa khoảng trắng
//       .trim(); // Loại bỏ khoảng trắng ở đầu và cuối
//   };
  
//   // Dữ liệu danh sách địa chỉ có sẵn
//   const addresses = [
//     "Số 4, đường Trần Phú, Quận Hải Châu, Đà Nẵng, Việt Nam",
//     "Hà Nội",
//     "TP. Hồ Chí Minh",
//     "Cần Thơ",
//     "Huế",
//     "Số 123, đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
//   ];
  
//   // Hàm tìm kiếm địa chỉ theo từ khóa
//   const searchAddress = (query, data) => {
//     const normalizedQuery = normalizeAddress(query);
//     console.log(`Từ khóa ban đầu: "${query}"`);
//     console.log(`Từ khóa đã chuẩn hóa: "${normalizedQuery}"`);
//     console.log("-----------------------");
  
//     const queryWords = normalizedQuery.split(" "); // Tách từ khóa thành các từ riêng lẻ
  
//     return data.filter((address) => {
//       const normalizedData = normalizeAddress(address);
//       // Đảm bảo tất cả từ trong từ khóa phải xuất hiện trong địa chỉ
//       return queryWords.every((word) => normalizedData.includes(word));
//     });
//   };
  
//   // Test tìm kiếm
//   const testSearches = [
//     "hải châu đà nẵng",
//     "trần phú, hải châu đà nẵng",
//     "hải châu, đà nẵng",
//     "Hồ Chí Minh",
//     "Hà Nội",
//     "Huế",
//     "da nang",
//     "quan 1 ho chi minh",
//   ];
//   testSearches.forEach((searchQuery) => {
//     const results = searchAddress(searchQuery, addresses);
//     console.log(`Kết quả tìm kiếm cho: "${searchQuery}"`);
//     console.log("Kết quả:", results.length ? results : "Không tìm thấy kết quả");
//     console.log("========================");
//   });

  