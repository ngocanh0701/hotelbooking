import cloudinaryModule from 'cloudinary';

const { v2: cloudinary } = cloudinaryModule;


// Cấu hình Cloudinary bằng các biến môi trường
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Tên tài khoản Cloudinary
  api_key: process.env.CLOUDINARY_API_KEY,      // API Key
  api_secret: process.env.CLOUDINARY_API_SECRET // API Secret
});

// module.exports = cloudinary;
export { cloudinary };
