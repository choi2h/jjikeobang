import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";



function Profile(){
    const [name, setUsername] = useState(null)
    useEffect(() => {
        fetch('/member/getProfile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => {
          if (data.name !== undefined) {
            setUsername(data.name);
          }else{
            setUsername('Guest');
          }
        })
        .catch(err => {
            alert('에러가 발생했습니다.');
        });
    });
    return (
        <div className="dropdown profile-dropdown">
            <button className="btn profile-btn dropdown-toggle" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="profile-circle">
                    <span value={name.charAt(0)}>김</span>
                </div>
                <span className="profile-name" value={name}>김철수</span>
                <i className="bi bi-chevron-down"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                <li><Link className="dropdown-item" to="voting-history.html">지난 투표 기록</Link></li>
                <li><Link className="dropdown-item" to="index.html">로그아웃</Link></li>
            </ul>
        </div>
    );
}

export default Profile;