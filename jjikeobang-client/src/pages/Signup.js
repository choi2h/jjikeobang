import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import logoCircle from '../assets/img/logo-circle.png';
import SignupButton from '../components/signup/SignupButton';
import SignupForm from '../components/signup/SignupForm';

function Signup() {
    const [formData, setFormData] = useState({
        userId: "",
        name: "",
        userPw: "",
        comparePw: ""
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
                <div className="col-lg-6 col-md-8">
                    <div className="signup-card">
                        <h2 className="text-center mb-4">회원가입</h2>
                        <p className="welcome-text text-center mb-4">새로운 계정을 만들어보세요</p>
                        <form>
                            <SignupForm formData={formData} setFormData={setFormData} />
                            <SignupButton formData={formData} />
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
};

export default Signup;