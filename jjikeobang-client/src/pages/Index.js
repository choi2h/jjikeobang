import React, { useEffect } from 'react';
import GuestDashboard from "../components/dashboard/GuestDashboard";
import UserDashboard from "../components/dashboard/UserDashboard";
const API_URL = process.env.REACT_APP_API_URL;


function Main() {
    useEffect(() => {
        fetch(`${API_URL}/session`, { credentials: 'include' })
            .then(res => res.ok ? res.json() : Promise.reject())
            .then(data => {
                console.log('로그인 확인', data.memberId);
                if (data.user) {
                    return (<UserDashboard user={data.memberId} />);
                } else {
                    return (<GuestDashboard />);
                }
            })
            .catch(() => {
                console.log('로그인 안됨');
                return (<GuestDashboard />);
            });
    })
}

export default Main;