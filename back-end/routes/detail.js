import express from "express";
import{
    createDetail,
    getDetailuser,
    getDetailhotel
} from "../controllers/detail.js"
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

router.post("/:id", createDetail);// id user

router.get("/finduser/:iduser", getDetailuser);
router.get("/findhotel/:idhotel", getDetailhotel);
export default router;
