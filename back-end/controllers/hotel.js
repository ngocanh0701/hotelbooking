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
};
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
      cheapestPrice: { $gte: min | 1, $lte: max || 999 },
    }).lean();
    

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
      cheapestPrice: { $gte: min | 1, $lte: max || 999 },
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

export const linkuserhotel = async (req, res, ) => {
  const { userId } = req.params;
  const { name, address, title, desc, cheapestPrice, photos, avatar } = req.body;

  try {
    // Kiểm tra xem user đã có hotel hay chưa
    const existingHotel = await Hotel.findOne({ user: userId });

    let hotel;
    if (existingHotel) {
      // Nếu đã có hotel, cập nhật thông tin khách sạn
      hotel = await Hotel.findByIdAndUpdate(
        existingHotel._id,
        { name, address, title, desc, cheapestPrice, photos, avatar },
        { new: true }
      );
    } else {
      // Nếu chưa có, tạo mới khách sạn
      newHotel = new Hotel({ name, address, title, desc, cheapestPrice, photos, avatar, userid: userId });
      const savedHotel = await newHotel.save();
      await Userhotel.findByIdAndUpdate(userId, { hotelId: savedHotel._id });
      res.status(201).json(savedHotel);

      // Cập nhật user với hotelId
      await User.findByIdAndUpdate(
        userId,
        { hotelId: hotel._id },
        { new: true }
      );
    }

    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};