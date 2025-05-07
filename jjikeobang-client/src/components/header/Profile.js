import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";


function Profile({user}){
    
    return (
        <div className="dropdown profile-dropdown">
            <button className="btn profile-btn dropdown-toggle" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="profile-circle">
                    <span>{user.charAt(0)}</span>
                </div>
                <span className="profile-name">{user}</span>
                <i className="bi bi-chevron-down"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                <li><Link className="dropdown-item" to="voting-history.html">지난 투표 기록</Link></li>
                <li><Link className="dropdown-item" to="index.html">로그아웃</Link></li>
            </ul>
        </div>
    );
}

export default Profile;