import mongoose from "mongoose";
const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: false,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: false,
  },
  featured: {
    type: Boolean,
    default: false,
  }, 
  userid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Userhotel",
  }
});

export default mongoose.model("Hotel", HotelSchema)