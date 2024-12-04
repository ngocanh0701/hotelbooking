import express from "express";
import {
    updateUserhotel,
    deleteUserhotel,
    getUserhotel,
    getUsershotel,
    
} from "../controllers/userhotel.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/:id", updateUserhotel);
//DELETE
router.delete("/:id", deleteUserhotel);

//GET
router.get("/:id", getUserhotel);

//GET ALL
router.get("/", getUsershotel);

//router.get("/getuser", getUserbyNPhotel);
export default router;
