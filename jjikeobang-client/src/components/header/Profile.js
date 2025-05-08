import React from "react";
import { Link } from "react-router-dom";


const API_URL = process.env.REACT_APP_API_URL;

function Profile({user}){

    const handleLogout = async () => {
        try {
            const response = await fetch(`${API_URL}/member/logout`, {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                alert('정상적으로 로그아웃 되었습니다.');
                window.location.reload();
            } else {
                console.log(response.status);
                alert('에러가 발생했습니다.');
            }
        } catch (error) {
            console.error('오류 발생:', error);
            alert('에러가 발생했습니다.');
        }
    }
    
    return (
        <div className="dropdown profile-dropdown">
            <button className="btn profile-btn dropdown-toggle" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="profile-circle">
                    <span>{!user ? '' : user.charAt(0)}</span>
                </div>
                <span className="profile-name">{user}</span>
                <i className="bi bi-chevron-down"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                <li><Link className="dropdown-item" to="voting-history.html">지난 투표 기록</Link></li>
                <li><Link className="dropdown-item" onClick={handleLogout}>로그아웃</Link></li>
            </ul>
        </div>
    );
}

export default Profile;