import React from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const LoginButton = ({ formData }) => {
    const navigate = useNavigate();
    const handleLogin = async () => {
        if (formData.userId.trim() === "" ||
            formData.userPw.trim() === "") {
            alert("모든 필드는 빈 칸이 될 수 없습니다.");
            return;
        }
        try {
            const response = await fetch(`${API_URL}/member/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: formData.userId,
                    userPw: formData.userPw
                }),
            });

            if (response.ok) {
                const json = await response.json()
                if (json.login_status) {
                    alert('정상적으로 로그인 되었습니다.');
                    navigate('/');
                } else {
                    alert('아이디 또는 비밀번호가 잘못되었습니다.');
                }
            } else {
                console.log(response.status);
                alert('에러가 발생했습니다.');
            }
        } catch (error) {
            console.error('오류 발생:', error);
            alert('에러가 발생했습니다.');
        }
    };

    return (
        <div className="d-grid mb-3">
            <button type="button" className="btn btn-login" onClick={handleLogin}>로그인</button>
        </div>
    )
}

export default LoginButton;