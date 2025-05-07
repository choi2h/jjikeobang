import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/img/logo.png';
import Profile from "../components/header/Profile";

function Dashboard(){
    const [entryCode, setEntryCode] = useState('');
    const navigate = useNavigate();
    const enterVoteRoom = async() => {

        fetch('http://localhost:8080/room/entry', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'entryCode=' + entryCode,
            credentials: 'include'
            })
            .then(async (res) => {
                const resData = await res.json();

                if (!res.ok) {
                    throw new Error(resData.message);
                }
                return resData;
            })
            .then((data) => {
                navigate('/voteUser',{
                    state : {
                        roomInfo : data.roomInfo, //방 정보 
                    }
                });
            })
            .catch((err) => {
                console.error('에러 발생:', err);
                alert(err.message);
            });
    };

    return(
        <div className="container-fluid main-container">
            {/* 상단 프로필 영역 */}
            <div className="row mb-4">
                <div className="col-12 d-flex justify-content-end">
                    <Profile />
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
                            <input type="text" className="form-control" value={entryCode} onChange={(e)=>{setEntryCode(e.target.value)}} placeholder="입장 코드" aria-label="입장 코드" />
                            <button className="btn btn-primary" type="button" onClick={enterVoteRoom}>입장</button>
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