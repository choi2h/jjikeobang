import React from 'react';
import { useNavigate } from 'react-router-dom';
const LoginButton = ({ formData }) => {
    const navigate = useNavigate();
    const handleLogin = async () => {
        navigate('/dashboard');
        
    };

    return (
        <div className="d-grid mb-3">
            <button type="button" className="btn btn-login" onClick={handleLogin}>로그인</button>
        </div>
    )
}

export default LoginButton;