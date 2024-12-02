// Import thư viện unidecode
import unidecode from 'unidecode';

export const normalizeAddress = (address) => {
  if (!address) return '';
  return unidecode(address) // Bỏ dấu
    .toLowerCase() // Chuyển về chữ thường
    .replace(/\s+/g, ' ') // Thay nhiều khoảng trắng bằng một
    .replace(/,/g, ' ') // Đổi dấu phẩy thành khoảng trắng
    .trim(); // Xóa khoảng trắng thừa đầu/cuối
};

export default normalizeAddress;
