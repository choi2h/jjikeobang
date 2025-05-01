import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';

function Main() {
    return (
    <div className="container-fluid main-container d-flex flex-column justify-content-center align-items-center">
        <div className="logo-container text-center mb-3">
            <img src={logo} alt="찍어방 로고" className="img-fluid logo-main" />
        </div>
        <div className="welcome-text text-center mb-4">
            <p>새로운 방을 만들거나 참여하세요</p>
        </div>
        <div className="login-container mb-3">
            <nav>
                <Link to="/login" className="btn btn-login login-index">로그인</Link>
            </nav>
        </div>
        <div className="signup-container mb-5">
        <nav>
            <Link to="/signup" className="signup-link">회원가입</Link>
        </nav>
        </div>
        <div className="footer-text text-center">
            <p>멋쟁이사자처럼 백엔드 15기 회고 8팀</p>
        </div>
    </div>
    );
}

export default Main;