import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import upload from '../config/multer.js';
import normalizeAddress from "../hooks/utils.js";
import Userhotel from "../models/Userhotel.js";

export const createHotel = async (req, res, next) => {
  const { userid } = req.body; // Lấy `id` từ params
  //const { name, address, price, desc, title, avatar, photos } = req.body; // Các trường dữ liệu khác

  try {
    const { name, address, title, desc, cheapestPrice, avatar, photos } = req.body;

    const newHotel = new Hotel({
      name,
      address,
      title,
      desc,
      cheapestPrice,
      avatar,
      photos,
      userid,
    });

    const savedHotel = await newHotel.save();
    await Userhotel.findByIdAndUpdate(userid, { hotelId: savedHotel._id });
    res.status(201).json(savedHotel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating hotel' });
  }

  // try {
  //   // Xử lý ảnh đại diện
  //   const avatarImage = req.files["avatar"] ? req.files["avatar"][0].path : null;

  //   // Xử lý ảnh minh họa
  //   const photosImages = req.files["photos"]
  //     ? req.files["photos"].map((file) => file.path)
  //     : [];
  //   console.log('Avatar Image:', avatarImage);
  //   console.log('Photos Images:', photosImages);
  //   // Tạo dữ liệu khách sạn mới
  //   const newHotel = new Hotel({
  //     name,
  //     address,
  //     price,
  //     desc,
  //     title,
  //     userId: id,
  //     avatar: avatarImage, // URL ảnh đại diện
  //     photos: photosImages, // URL ảnh minh họa
  //   });
  //   const savedHotel = await newHotel.save(); // Lưu vào database
  //   res.status(200).json(savedHotel);
  // } catch (err) {
  //   next(err); // Xử lý lỗi
  // }
};

// export const createHotel = async (req, res, next) => {
//   const { id } = req.params;
//   const newHotel = new Hotel({ ...req.body, userId:id });

//   try {
//     const savedHotel = await newHotel.save();
//     res.status(200).json(savedHotel);
//   } catch (err) {
//     next(err);
//   }
// };
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};

// Backend (Node.js/Express)

const normalizeHotelAddress = (address) => {
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

export const getaddress = async (req, res) => {
  const { address, min = 0, max = 999999, ...others  } = req.query;

  // Kiểm tra input
  if (!address) {
    return res.status(400).json({ error: "Address query is required." });
  }

  // Chuẩn hóa địa chỉ tìm kiếm
  const normalizedQuery = normalizeHotelAddress(address);
  

  try {
    // Lấy toàn bộ dữ liệu khách sạn từ cơ sở dữ liệu
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).lean();
    
    console.log("Danh sách địa chỉ khách sạn:");
    hotels.forEach((hotel) => {
      console.log(`Tên khách sạn: ${hotel.name}, Địa chỉ: ${hotel.address}`);
    });

    // Lọc các khách sạn dựa trên địa chỉ đã chuẩn hóa
    const filteredHotels = hotels.filter((hotel) => {
      const normalizedHotelAddress = normalizeAddress(hotel.address || "");
      return normalizedHotelAddress.includes(normalizedQuery);
    });

    // Log dữ liệu để debug (nếu cần)
    console.log("Normalized Query:", normalizedQuery);
    console.log("Filtered Hotels:", filteredHotels);

    // Trả kết quả cho client
    res.status(200).json(filteredHotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
