import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import enterRoom from "../../service/EntryRoomService.js";
import Profile from '../header/Profile.js';

function UserDashboard({ user }) {
    console.log('UserDashBoard : ' + user);
    const [roomCode, setRoomCode] = useState("");
    const navigate = useNavigate();

    const updateRoomCode = (e) => {
        setRoomCode(e.target.value);
    }

    const onClickEnterVotingRoom = async() => {
        console.log(`click enter room button!!!! inputRoomCode=${roomCode}`);
        if(roomCode === "") {
            alert("입장 코드를 입력해주세요.");
            return;
        }

        enterRoom(roomCode).then((res) => {
            console.log(`enter room result=${JSON.stringify(res)}`);
            if(res && res.success) {
                navigate('/userWaiting', {
                    state: {
                        roomInfo: res.roomInfo
                    }
                })
            }
        });
    };
    
    const handleCreatRoom = (e) => {
        e.preventDefault();

        navigate("/createRoom",{
            state : {
                user : user
            }
        });
    };
  
    return (
        <div className="container-fluid main-container">
            <div className="row mb-4">
                <div className="col-12 d-flex justify-content-end">
                    <Profile user={user}/>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 text-center">
                    <div className="logo-container mb-4">
                        <img src={logo} alt="찍어방 로고" className="img-fluid logo-main" />
                    </div>
                    <div className="welcome-text mb-5">
                        <p>새로운 방을 만들거나 참여하세요</p>
                    </div>
                    <div className="mb-4">
                        <Link onClick={handleCreatRoom} className="btn btn-login btn-makeroom mb-3">방 만들기</Link>
                    </div>
                    <div className="mb-5">
                        <p className="text-center sub-text mb-2">또는 입장 코드로 참여</p>
                        <div className="input-group room-code-input">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="입장 코드" 
                                aria-label="입장 코드" 
                                onChange={updateRoomCode}/>
                            <button className="btn btn-primary" type="button" onClick={onClickEnterVotingRoom}>입장</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-text">
                <p>멋쟁이사자처럼 백엔드 15기 회고 8팀</p>;
            </div>
        </div>
    );
}


export default UserDashboard;