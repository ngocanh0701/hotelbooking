import React from 'react';
import axios from "axios";
import '../register/register.css';
import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { baseAPI } from '../../hooks/utils';
import { faUser, faLock, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'; // Import icon
const Register = () =>{

    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        isAdmin: '', // 'user' or 'hotel'
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(`${baseAPI}/auth/register`, formData);
          console.log(res.data);
          navigate('/login'); // Redirect to login page after successful registration
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className='wrapper'>
            <form action="">
                <h1>Dang ki</h1>
                {/* Full name */}
                <div className="input-box">
                    <input type="text" placeholder='Ho ten' name='fullname' value={formData.fullname} onChange={handleChange} required/>
                </div>

                <div className="input-box">
                    <input type="text" placeholder='ten dang nhap' name='username' value={formData.username} onChange={handleChange} required/>
                    <FontAwesomeIcon icon={faUser} size="x" className='icon'/>
                </div>

                <div className="input-box">
                    <input type="text" placeholder='email' name='email' value={formData.email} onChange={handleChange} required/>
                    <FontAwesomeIcon icon={faEnvelope} size="x" className='icon'/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder='mat khau' name='password' value={formData.password} onChange={handleChange} required/>
                    <FontAwesomeIcon icon={faLock} size="x" className='icon'/>
                </div>
                <div className="input-box">
                    <input type="text" placeholder='So dien thoai ' name='phone' value={formData.phone} onChange={handleChange} required/>
                    <FontAwesomeIcon icon={faPhone} size="x" className='icon'/>
                </div>
                

                <div className="remember-forgot">
                </div>

                {/* Error message */}
                {error && <div className="error-message">{error}</div>}

                {/* Submit button */}
                <button type="submit" onClick={handleSubmit}>Đăng ký</button>

                {/* Link to login */}
                <div className="register-link">
                <p>
                    Đã có tài khoản? <a href="/login">Đăng nhập</a>
                </p>
                </div>
            </form>
        </div>
    )
}

export default Register;
