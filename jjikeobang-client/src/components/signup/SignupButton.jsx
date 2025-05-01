import React from "react";
import { useNavigate } from "react-router-dom";

const SignupButton = ({ formData }) => {
  const navigate = useNavigate();
  const handleSignup = async () => {
    if (formData.userPw !== formData.comparePw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (formData.userId.trim() === "" ||
            formData.name.trim() === "" ||
            formData.userPw.trim() === "") {
      alert("모든 필드는 빈 칸이 될 수 없습니다.");
      return;
    }
    // JSON 형식으로 서버에 데이터 전송, 현 시점 서버 개발 중
    try {
      const response = await fetch('/member/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: formData.userId,
          name: formData.name,
          userPw: formData.userPw,
        }),
      });

      if (response.ok && response.joinstatus === 'success') {
        alert('회원가입 성공');
        navigate('/login');
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('오류 발생:', error);
      alert('에러가 발생했습니다.');
    }
  };

  return (
    <div className="d-grid gap-2 mb-3">
      <button type="button" onClick={handleSignup} className="btn btn-primary btn-signup">회원가입</button>
    </div>
  );
};

export default SignupButton;