import React from 'react';
import { Link } from 'react-router-dom';
import logoCircle from '../assets/img/logo-circle.png';

function Signup() {
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
                <div className="col-lg-6 col-md-8">
                    <div className="signup-card">
                        <h2 className="text-center mb-4">회원가입</h2>
                        <p className="welcome-text text-center mb-4">새로운 계정을 만들어보세요</p>
                        <form>
                            <div className="mb-3">
                                <label for="userId" className="form-label">아이디</label>
                                <input type="text" className="form-control" id="userId" placeholder="아이디를 입력하세요" />
                            </div>

                            <div className="mb-3">
                                <label for="userName" className="form-label">이름</label>
                                <input type="text" className="form-control" id="userName" placeholder="이름을 입력하세요" />
                            </div>

                            <div className="mb-3">
                                <label for="userPassword" className="form-label">비밀번호</label>
                                <input type="password" className="form-control" id="userPassword" placeholder="비밀번호를 입력하세요" />
                            </div>

                            <div className="mb-4">
                                <label for="userPasswordConfirm" className="form-label">비밀번호 확인</label>
                                <input type="password" className="form-control" id="userPasswordConfirm"
                                    placeholder="비밀번호를 다시 입력하세요" />
                            </div>

                            <div className="d-grid gap-2 mb-3">
                                <button type="button" className="btn btn-primary btn-signup">회원가입</button>
                            </div>

                            <div className="text-center">
                                <Link to="/login" className="signup-link">로그인</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="footer footer-text">
                <p>멋쟁이사자처럼 백엔드 15기 회고 8팀</p>
            </div>
            <script src="../assets/js/bootstrap.bundle.min.js"></script>
        </div>
    );
}

export default Signup;
