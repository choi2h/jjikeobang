import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/img/logo.png';

function Dashboard(){

    const navigate = useNavigate();
    const handleVoting = async() => {
        navigate("/voting");
    };

    return(
        <div className="container-fluid main-container">
            {/* 상단 프로필 영역 */}
            <div className="row mb-4">
                <div className="col-12 d-flex justify-content-end">
                    <div className="dropdown profile-dropdown">
                        <button className="btn profile-btn dropdown-toggle" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="profile-circle">
                                <span>김</span>
                            </div>
                            <span className="profile-name">김철수</span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                            <li><Link className="dropdown-item" to="/votingHistory">지난 투표 기록</Link></li>
                            <li><Link className="dropdown-item" to="/">로그아웃</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 text-center">
                    <div className="logo-container mb-4">
                        <img src={logo} alt="찍어방 로고" className="img-fluid logo-main" />
                    </div>
                    <div className="welcome-text mb-5">
                        <p>새로운 방을 만들거나 참여하세요</p>
                    </div>
                    <div className="mb-4">
                        <Link to="/createRoom" className="btn btn-login btn-makeroom mb-3">방 만들기</Link>
                    </div>
                    <div className="mb-5">
                        <p className="text-center sub-text mb-2">또는 입장 코드로 참여</p>
                        <div className="input-group room-code-input">
                            <input type="text" className="form-control" placeholder="입장 코드" aria-label="입장 코드" />
                            <button className="btn btn-primary" type="button" onClick={handleVoting}>입장</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 푸터 */}
            <div className="footer-text">
                <p>멋쟁이사자처럼 백엔드 15기 회고 8팀</p>
            </div>
        </div>
    );
}

export default Dashboard;