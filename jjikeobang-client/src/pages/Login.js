import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoCircle from '../assets/img/logo-circle.png';
import LoginForm from '../components/login/LoginForm';
import LoginButton from '../components/login/LoginButton';

function Login(){
    
    const [formData, setFormData] = useState({
        userId: "",
        password: ""
    });


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
                            
                            <LoginForm formData={formData} setFormData={setFormData} />
                            <LoginButton formData={formData} />
                            
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