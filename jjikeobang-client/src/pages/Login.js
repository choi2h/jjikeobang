import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logoCircle from '../assets/img/logo-circle.png';

function Login(){

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // 페이지 이동을 위한 hook

    const handleLogin = async () => {
        navigate('/dashboard');
        /*
        try {
            const response = await axios.post('http://localhost:8080/doLogin', {
            userId,
            password,
        });

            if (response.data.status === 'success') {
                alert('로그인 성공!');
                localStorage.setItem('isLoggedIn', 'true');
                navigate('/dashboard');  // 로그인 성공 시 홈 화면으로 이동
            } else {
                alert('로그인 실패: ' + response.data.message);
            }
        } catch (error) {
            alert('서버 오류: ' + error.message);
        }
        */
    };

    return (
        <div className="container-fluid main-container">
            <div className="row">
                <div className="col-12 mt-1">
                    <a href="index.html">
                        <img src={logoCircle} alt="찍어방 로고" className="img-fluid logo-circle" />
                    </a>
                </div>
            </div>
            
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5 col-xl-4">
                    <div className="login-card">
                        <h2 className="text-center mb-4">로그인</h2>
                        
                        <p className="text-center welcome-text mb-4">계정에 로그인하고 투표를 시작하세요!</p>
                        
                        <form>
                            <div className="mb-3">
                                <label for="userId" className="form-label">아이디</label>
                                <input type="text" className="form-control" id="userId" 
                                    value={userId} 
                                    onChange={(e) => setUserId(e.target.value)}
                                    placeholder="아이디를 입력하세요" />
                            </div>
                            
                            <div className="mb-4">
                                <label for="userPassword" className="form-label">비밀번호</label>
                                <input type="password" className="form-control" id="userPassword" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="비밀번호를 입력하세요" />
                            </div>
                            
                            <div className="d-grid mb-3">
                                <button type="button" className="btn btn-login" onClick={handleLogin}>로그인</button>
                            </div>
                            
                            <div className="text-center">
                                <Link to="/signup" className="signup-link">회원가입</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;