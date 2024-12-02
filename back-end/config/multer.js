import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from './cloudinary.js'; // Import Cloudinary instance

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const hotelName = req.body.name || 'default'; // Sử dụng 'name' làm thư mục lưu trữ
    return {
      folder: `hotels/${hotelName}`, // Thư mục trên Cloudinary
      allowed_formats: ["jpg", "png", "jpeg"], // Chỉ cho phép các định dạng này
      public_id: `${Date.now()}_${file.originalname.split('.')[0]}`, // Tên file duy nhất
    };
  },
});

const upload = multer({ storage }); // Middleware Multer với Cloudinary

export default upload;
