import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    fullname:{
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    hotelid: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Hotel",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Userhotel", UserSchema);
