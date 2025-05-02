import React, { useEffect, useState } from 'react';
import GuestDashboard from "../components/dashboard/GuestDashboard";
import UserDashboard from "../components/dashboard/UserDashboard";
const API_URL = process.env.REACT_APP_API_URL;


function Main() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [userName, setUserName] = useState('');
    useEffect(() => {
        fetch(`${API_URL}/profile`, { credentials: 'include' })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(data => {
            console.log('로그인 확인', data.memberId);
            if (data.is_logged_in) {
                console.log('로그인 됨', data.name);
                setUserName(data.name);
                setIsLoggedIn(true);
            } else {
                console.log('로그인 안됨');
                setIsLoggedIn(false);
            }
        })
        .catch(() => {
            setIsLoggedIn(false);
        });
    }, []);

    return isLoggedIn ? (
        <UserDashboard user={userName} />
    ) : (
        <GuestDashboard />
    );
}

export default Main;