// Import thư viện unidecode
const unidecode = require('unidecode');

export const normalizeAddress = (address) => {
  if (!address) return '';
  return unidecode(address) // Bỏ dấu
    .toLowerCase() // Chuyển về chữ thường
    .replace(/\s+/g, ' ') // Thay nhiều khoảng trắng bằng một
    .replace(/,/g, ' ') // Đổi dấu phẩy thành khoảng trắng
    .trim(); // Xóa khoảng trắng thừa đầu/cuối
};

// utils.js
export const baseAPI = "https://hotelbooking-0gxj.onrender.com/api";
