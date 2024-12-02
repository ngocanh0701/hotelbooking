import User from "../models/User.js";

export const updateUserhotel = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}
export const deleteUserhotel = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}
export const getUserhotel = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
export const getUserbyNP = async (req,res,next)=>{
  try {
    const { username, password } = req.query;
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(404).json({ message: "User not found or incorrect credentials" });
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
export const getUsershotel = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}