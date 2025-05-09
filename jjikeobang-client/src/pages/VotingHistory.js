import React, { useEffect, useState } from "react";
import Profile from "../components/header/Profile";
import Logo from "../components/header/Logo";
import getVoteHistories from "../service/VoteHistoryService";
import HistoryCard from "../components/history/HistoryCard";
import { useLocation } from "react-router-dom";

function VotingHistory(){
    const location = useLocation();
    const user = location.state.user;
    const [histories, setHistories] = useState([]);

    useEffect(() => {
        getVoteHistories().then((res) => {
            setHistories(res);
        });
    }, []);

    return (
        <>
            {/* 상단 프로필 영역 */}
            <nav className="navbar mb-4">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <Logo/>
                    <Profile user={user}/>
                </div>
            </nav>
            
            <div class="container-fluid main-container">
                <div class="history-container">
                    <h1 class="history-title">지난 투표 기록</h1>
                        {
                            (!histories || histories.length === 0) ?
                                '투표 참여기록이 없습니다.' : 
                                histories.map((history, index) => {
                                    return <HistoryCard key={index} historyInfo={history}/>;
                                }
                            )
                        }
                </div>
            </div>

            {/* 부트스트랩 JS */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </>
    );
}

export default VotingHistory;