import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./home.css";
import React, { useState, useEffect, useContext } from "react"; // Sửa lỗi import ở đây
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    city: '',
    address: '',
    title: '',
    desc: '',
    cheapestPrice: '',
    distance: '',
    rooms: '', 
    photos:'',
    avatar:''
  });

  const [image, setImage] = useState([]);
  const [avatarimg, setAvatarImage] = useState([]); // To store image data
  const [avatarImgUpload, setAvatarImgUpload] = useState(""); // Sử dụng useState để quản lý URL ảnh
  const [loading, setLoading] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Lấy dữ liệu người dùng từ context
  
  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        if (user?._id) {
          const res = await axios.get(`http://localhost:8800/api/hotels/${user._id}`); // API lấy dữ liệu khách sạn của user
          if (res.data) {
            setFormData(res.data); // Đổ dữ liệu vào form
            setIsFirstTime(false); // Đặt trạng thái là không phải lần đầu
          }
        }
      } catch (err) {
        console.error("Error fetching hotel data:", err);
      }
    };

    if (!isFirstTime && user) fetchHotelData();
  }, [isFirstTime, user]);


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = async(e) => {
    const files = e.target.files;  // Lấy tất cả các file ảnh
    if (!files.length) return;
    setLoading(true);

    // Sử dụng Promise.all để tải nhiều file lên cùng lúc
    try {
      const uploadedUrls = await Promise.all(
        Array.from(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "first_using");
          data.append("cloud_name", "deb8a4xy6");

          const res = await fetch("https://api.cloudinary.com/v1_1/deb8a4xy6/image/upload", {
            method: "POST",
            body: data,
          });
          if (!res.ok) { throw new Error("Image upload failed."); }
          const uploadImageURL = await res.json();
          //setAvatarImgUpload(uploadImageURL.url)
          console.log(uploadImageURL.url)
          return uploadImageURL.url; // Trả về URL của ảnh đã upload
        })
      );

      // Sau khi tất cả ảnh đã được upload, cập nhật state
      setImage((prev) => [...prev, ...uploadedUrls]);
    } catch (err) {
      console.error("Error uploading image:", err);
    }

    setLoading(false);
  };

  const handleAvatarImageChange = async(e) => {
    const file = e.target.files[0]; // Chuyển đổi file list thành array
    if(!file) return
    setLoading(true)
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "first_using")
    data.append("cloud_name", "deb8a4xy6")
    
    try{
      const res = await fetch("https://api.cloudinary.com/v1_1/deb8a4xy6/image/upload", {
        method:"POST",
        body:data
      })
  
      const uploadImageURL = await res.json()
      setAvatarImgUpload(uploadImageURL.url)
      setFormData((prev) => {
        const newFormData = { ...prev, avatar: uploadImageURL.url };
        console.log('update', newFormData);
      return newFormData;
    }); // Cập nhật formData ngay sau khi có URL 
      console.log(uploadImageURL.url)
    } catch(error){
      console.error("Error upload avartar image", error);
    }finally{
      setLoading(false)
    }
    

    // console.log(file);
    // setLoading(false)
    //setAvatarImage(file); // Lưu vào state, sẽ chứa tất cả các ảnh
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Current user from context:", user);
    
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("address", formData.address);
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("desc", formData.desc);
    formDataToSubmit.append("cheapestPrice", formData.cheapestPrice);
  
    // Thêm ảnh đại diện nếu có
    if (avatarImgUpload ) formDataToSubmit.append("avatar", avatarImgUpload);
  
    // Thêm tất cả các ảnh mô tả (gallery images)
    if (image && image.length > 0) {
      image.forEach((url) => {
        formDataToSubmit.append("photos", url); // Thêm từng ảnh vào FormData
      });
    }
    for (const [key, value] of formDataToSubmit.entries()) { console.log(`${key}: ${value}`); }
    try {
      if (!user._id) {
        console.error("ID của user bị thiếu!");
        return;
      }
      const endpoint = isFirstTime
       ? `http://localhost:8800/api/hotels/${user._id}` 
       : `http://localhost:8800/api/hotels/updateHotel/${user.hotelid}`;

       const method = isFirstTime ? "post" : "put";

      await axios({ 
        method, 
        url: endpoint, 
        data: formDataToSubmit, 
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (isFirstTime) setIsFirstTime(false); // Đánh dấu là không phải lần đầu submit
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <Navbar />
      <Header />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Ảnh đại diện:</label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                onChange={handleAvatarImageChange} // Handle image change
              />
              {
                loading ? "Uploading...." : <img src={avatarImgUpload} alt="" width="200px"/>
              }
            </div>
            <div className="form-group">
              <label>Tên khách sạn:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Hãy điền tên khách sạn"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Địa chỉ:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Hãy điền địa chỉ chính xác khách sạn của bạn."
              />
            </div>
          </div>

          

          <div className="form-row">
          <div className="form-group">
            <label>Loại khách sạn:</label>
            <select 
              name="type" 
              value={formData.type} 
              onChange={handleChange}
            >
              <option value="">Chọn loại hình</option> {/* Giá trị mặc định */}
              <option value="khach-san">Khách sạn</option>
              <option value="nha-nghi">Nhà nghỉ</option>
              <option value="can-ho">Căn hộ</option>
              <option value="homestay">Homestay</option>
              <option value="resort">Resort</option>
            </select>
          </div>
            <div className="form-group">
              <label>Giá:</label>
              <input
                type="text"
                name="cheapestPrice"
                value={formData.cheapestPrice}
                onChange={handleChange}
                placeholder="Hãy viết giá phòng thấp nhất ở khách sạn của bạn."
              />
            </div>
          </div>

          <div className="form-row">
          <div className="form-group">
            <label>Giới thiệu chung:</label>
            <textarea
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Hãy viết lời giới thiệu chung về khách sạn của bạn"
              rows={2} // Số hàng hiển thị ban đầu
              style={{ width: '100%' }} // Đảm bảo chiếm toàn chiều rộng container
            />
          </div>
            
          </div>
          <div className="form-group">
            <label>Mô tả chi tiết:</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              placeholder="Viết mô tả chi tiết về khách sạn của bạn, về những dịch vụ mà bạn có, ...."
              rows={6} // Số hàng hiển thị ban đầu
              style={{ width: '100%' }} // Đảm bảo chiếm toàn chiều rộng container
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Ảnh mô tả:</label>
              <input
                type="file"
                id="photos"
                name="photos"
                onChange={handleImageChange} // Gọi hàm handle khi người dùng chọn file
                multiple // Cho phép tải lên nhiều ảnh
              />
              {loading ? (
                "Uploading...."
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {image.map((img, index) => (
                    <img key={index} src={img} alt={`Uploaded ${index}`} width="200px" />
                  ))}
                   </div>
              )}
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isFirstTime ? "Submit" : "Update"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
