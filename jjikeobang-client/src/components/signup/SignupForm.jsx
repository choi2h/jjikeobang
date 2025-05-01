import React from 'react';

const SignupForm = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };


    return (
        <>
            <div className="mb-3">
                <label for="userId" className="form-label">아이디</label>
                <input type="text" className="form-control" id="userId"
                 value={formData.userId} onChange={handleChange}
                  placeholder="아이디를 입력하세요" />
            </div>

            <div className="mb-3">
                <label for="userName" className="form-label">이름</label>
                <input type="text" className="form-control" id="userName"
                 value={formData.name} onChange={handleChange}
                  placeholder="이름을 입력하세요" />
            </div>

            <div className="mb-3">
                <label for="userPassword" className="form-label">비밀번호</label>
                <input type="password" className="form-control" id="userPassword"
                 value={formData.userPw} onChange={handleChange}
                  placeholder="비밀번호를 입력하세요" />
            </div>

            <div className="mb-4">
                <label for="userPasswordConfirm" className="form-label">비밀번호 확인</label>
                <input type="password" className="form-control" id="userPasswordConfirm"
                 value={formData.comparePw} onChange={handleChange}
                  placeholder="비밀번호를 다시 입력하세요" />
            </div>
        </>

    );

};