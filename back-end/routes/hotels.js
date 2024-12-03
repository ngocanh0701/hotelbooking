import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
  getaddress,
  linkuserhotel
} from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import {verifyAdmin} from "../utils/verifyToken.js"
import upload from '../config/multer.js';
const router = express.Router();

//CREATE
// router.post("/:id", createHotel);
router.post(
  "/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 }, // 1 ảnh đại diện
    { name: "photos", maxCount: 10 }, // Tối đa 10 ảnh minh họa
  ]),
  createHotel
);

router.get("/hotelsaddress",getaddress);
//UPDATE
router.put("/:id", updateHotel);
//DELETE

router.delete("/:id", deleteHotel);
//GET

router.get("/find/:id", getHotel);
//GET ALL

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);
router.post("/linkUserHotel/:id", linkuserhotel)

export default router;
