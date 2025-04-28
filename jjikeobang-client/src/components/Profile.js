import React from "react";
import { Link } from "react-router-dom";
import logoCircle from '../assets/img/logo-circle.png';

function Profile(){
    return (
        <>
            {/* 상단 프로필 영역 */}
            <nav className="navbar mb-4">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <div className="navbar-brand d-flex align-items-center">
                        <Link to="/" className="d-flex align-items-center">
                            <img src={logoCircle} alt="찍어방 로고" className="img-fluid logo-circle" />
                        </Link>
                    </div>
                    <div className="dropdown profile-dropdown">
                        <button className="btn profile-btn dropdown-toggle" type="button" id="profileDropdown"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="profile-circle">김</div>
                            <span className="profile-name">김철수</span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                            <li><Link className="dropdown-item" to="/votingHistory">지난 투표 기록</Link></li>
                            <li><Link className="dropdown-item" to="/">로그아웃</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Profile;