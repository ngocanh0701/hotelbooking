import Detail from "../models/Detail.js";
import Hotel from "../models/Hotel.js";
import User  from "../models/User.js";
import { createError } from "../utils/error.js";

export const createDetail = async (req, res, next) => {
  const userid = req.params.userid;
  const newDetail = new Detail(req.body);

  try {
    const savedDetail = await newDetail.save();
    try {
      await User.findByIdAndUpdate(userid, {
        $push: { details: savedDetail._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedDetail);
  } catch (err) {
    console.error("Error saving room:", err.message);
    next(err);
  }
};

export const getDetailuser = async (req, res, next) => {
  try {
    const iduser = req.query.iduser;
    const detail = await Detail.findOne({iduser:iduser});
    if (!detail) {
      return res.status(404).json({ message: "Detail not found" });
    }
    res.status(200).json(detail);
  } catch (err) {
    next(err);
  }
};

export const getDetailhotel = async (req, res, next) => {
  try {
    const idhotel = req.query.idhotel;
    const detail = await Detail.findOne({idhotel:idhotel});
    if (!detail) {
      return res.status(404).json({ message: "Detail not found" });
    }
    res.status(200).json(detail);
  } catch (err) {
    next(err);
  }
};