
import axios from 'axios';
import crypto from 'crypto';
import config from '../momo/config.js';
import { log } from 'console';
// Hàm tạo giao dịch
export const createPayment = async (req, res) => {
  const { amount } = req.body; // Lấy số tiền từ request
  const { accessKey, secretKey, partnerCode, redirectUrl, ipnUrl, requestType, extraData } = config;

  const orderId = partnerCode + new Date().getTime();
  const requestId = orderId;

  // Tạo chữ ký HMAC SHA256
  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=Thanh toán qua MoMo&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
  const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
  // console.log(config);
  
  // Tạo payload gửi đến MoMo
  const requestBody = {
    partnerCode,
    requestId,
    orderId,
    amount: amount,
    orderInfo: 'Thanh toán qua MoMo',
    redirectUrl,
    ipnUrl,
    requestType,
    extraData,
    signature,
    lang: 'vi',
  };
  console.log(requestBody);
  
  try {
    const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/create', requestBody, {
      headers: { 'Content-Type': 'application/json' },
    });
    
    res.status(200).json(response.data); // Trả về URL thanh toán cho frontend
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tạo giao dịch', error: error.message });
  }
};

// Hàm xử lý callback từ MoMo
export const handleCallback = (req, res) => {
  const result = req.body;

  if (result.resultCode === 0) {
    console.log('Thanh toán thành công:', result);
    console.log(req.body);
    // TODO: Cập nhật trạng thái đơn hàng là "đã thanh toán" trong database
  } else {
    console.error('Thanh toán thất bại:', result);
    // TODO: Xử lý trạng thái thất bại
  }

  res.status(204).send(); // Gửi phản hồi 204 No Content
};

// Hàm kiểm tra trạng thái giao dịch
export const checkTransaction = async (req, res) => {
  const { orderId } = req.body;
  const { accessKey, secretKey, partnerCode } = config;

  const requestId = orderId;
  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${requestId}`;
  const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

  const requestBody = {
    partnerCode,
    requestId,
    orderId,
    signature,
    lang: 'vi',
  };

  try {
    const response = await axios.post('https://test-payment.momo.vn/v2/gateway/api/query', requestBody, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(requestBody);
    
    res.status(200).json(response.data); // Trả về kết quả giao dịch
  } catch (error) {
    res.status(500).json({ message: 'Lỗi kiểm tra giao dịch', error: error.message });
  }
};
