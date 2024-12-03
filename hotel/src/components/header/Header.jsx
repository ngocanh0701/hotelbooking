import React from 'react';
import './header.css'
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
const Header = () =>{
    const { user, dispatch } = useContext(AuthContext);
    return (
        <div className="header">
            <ul>
                <li><Link to={`/thongtin/${user._id}`}>Thông tin</Link></li>
                <li><Link to="/bangphong">Quan ly phong</Link> </li>
                <li> <Link to="/">Thông ke</Link></li>
            </ul>
        </div>
    )
}

export default Header;
