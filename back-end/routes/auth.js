import express from "express";
import { login, register,loginhotel,registerhotel } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/loginhotel", loginhotel)
router.post("/registerhotel", registerhotel)

export default router