import express from "express";
import {
    createPayment, 
    handleCallback, 
    checkTransaction
  } from "../controllers/momoController.js";
//const { createPayment, handleCallback, checkTransaction } = require('../controllers/momoController');
const router = express.Router();

router.post('/payment', createPayment);
router.post('/callback', handleCallback);
router.post('/check-status', checkTransaction);
export default router;
