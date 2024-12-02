import express from "express";
import {
    updateUserhotel,
    deleteUserhotel,
    getUserhotel,
    getUsershotel,
    getUserbyNPhotel,
} from "../controllers/userhotel.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

//UPDATE
router.put("/:id", verifyUser, updateUserhotel);
//DELETE
router.delete("/:id", verifyUser, deleteUserhotel);

//GET
router.get("/:id", verifyUser, getUserhotel);

//GET ALL
router.get("/", verifyAdmin, getUsershotel);

router.get("/getuser", getUserbyNPhotel);
export default router;
