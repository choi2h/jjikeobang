import React from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const SignupForm = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };
    const checkDuplicateId = async () => {
        const userId = formData.userId.trim();
        if (!userId) {
            alert("아이디를 입력하세요.");
            return;
        }
        try{
            const response = await fetch(`${API_URL}/member/check-id?userId=${userId}`);
            if (response.ok) {
                const result = await response.json()
                if(result.isDuplicated){
                    alert('이미 사용 중인 아이디입니다.');
                    return;
                }else{
                    alert('사용 가능한 아이디입니다.');
                    return;
                }
            }else{
                alert('서버와 연결 중 오류가 발생했습니다.')
            }
        }catch(error) {
            console.error('오류 발생:', error);
            alert('에러가 발생했습니다.');
        }
    
    };


    return (
        <>
            <div className="mb-3">
                <label htmlFor="userId" className="form-label">아이디</label>
                <div className="input-group">
                    <input type="text" className="form-control" id="userId"
                        value={formData.userId} onChange={handleChange}
                        placeholder="아이디를 입력하세요" />
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={checkDuplicateId}>
                        중복 확인
                    </button>
                </div>

            </div>

            <div className="mb-3">
                <label htmlFor="name" className="form-label">이름</label>
                <input type="text" className="form-control" id="name"
                    value={formData.name} onChange={handleChange}
                    placeholder="이름을 입력하세요" />
            </div>

            <div className="mb-3">
                <label htmlFor="userPw" className="form-label">비밀번호</label>
                <input type="password" className="form-control" id="userPw"
                    value={formData.userPw} onChange={handleChange}
                    placeholder="비밀번호를 입력하세요" />
            </div>

            <div className="mb-4">
                <label htmlFor="comparePw" className="form-label">비밀번호 확인</label>
                <input type="password" className="form-control" id="comparePw"
                    value={formData.comparePw} onChange={handleChange}
                    placeholder="비밀번호를 다시 입력하세요" />
            </div>
        </>

    );

};

export default SignupForm;