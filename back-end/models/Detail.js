import mongoose from "mongoose";
const DetailSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: false,
  },
  phone: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  rooms: {
    type: [{ number: Number, typeroom: String }],
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  guests: {
    type: String,
  },
  total: {
    type: Number,
    default: true,
  },
  whoReserve: {
    type:Boolean,
    default:true,
  },
  iduser: {
    type:String,
    default:false,
  },
  status:{
    type:String,
  }
});

export default mongoose.model("Detail", DetailSchema)