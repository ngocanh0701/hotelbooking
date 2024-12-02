import React from 'react';
import './header.css'
import { Link } from "react-router-dom";
const Header = () =>{
    return (
        <div className="header">
            <ul>
                <li><Link to="/">Thông tin</Link></li>
                <li><Link to="/themphong">Them phong</Link> </li>
                <li> <Link to="/thongke">Thông ke</Link></li>
            </ul>
        </div>
    )
}

export default Header;
