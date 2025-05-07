import { Link } from "react-router-dom";
import logoCircle from '../../assets/img/logo-circle.png';
function Logo() {
    return (
        <div className="navbar-brand d-flex align-items-center">
            <Link to="/" className="d-flex align-items-center">
                <img src={logoCircle} alt="찍어방 로고" className="img-fluid logo-circle" />
            </Link>
        </div>
    );
}

export default Logo;