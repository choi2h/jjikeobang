import React from 'react';
import { useLocation } from 'react-router-dom';
import Profile from '../components/header/Profile';
import RoomHeader from '../components/voteInfo/RoomHeader';
import Chat from '../components/chat/Chat';
import VoteStatusBoard from '../components/voteInfo/VoteStatusBoard';

function UserWaiting(){
    const location = useLocation();

    const roomInfo = location.state.roomInfo;
    console.log(`Receive room info. ${JSON.stringify(roomInfo)}`);

    return (
        <>
         <div className="container-fluid main-container">
                {/* 상단 프로필 영역 */}
                <div className="row mb-4">
                    <div className="col-12 d-flex justify-content-end">
                        <Profile user="김철수"/>
                    </div>
                </div>

                {/* 대기 컨테이너 */}
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="waiting-container">
                            {/* 방 헤더 */}
                            <RoomHeader title={roomInfo.name} entryCode={roomInfo.entryCode} />

                            {/* 메인 콘텐츠 */}
                            <div className="row">
                                {/* 왼쪽 영역 (후보자 목록) */}
                                <div className="col-md-7 vote-wrapper">
                                <div className="candidate-list">
                                        {/* 후보자 */}
                                        <div className="candidate-list d-flex justify-content-center align-items-center" style={{ height: '300px', fontSize: '1.5rem' }}>
                                        투표 준비중입니다..
                                        </div>
                                    </div>
                                </div>

                                {/* 오른쪽 영역 (채팅) */}
                                <div className="col-md-5">
                                    <Chat />
                                </div>
                            </div>

                            {/* 투표 현황 */}
                            <div className="row mt-4">
                                <VoteStatusBoard label='총 득표수' content='0표' color='#1a4b8c ' />
                                <VoteStatusBoard label='남은 시간' content={`${roomInfo.voteDuration}분`} color='#f59e0b ' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 부트스트랩 JS */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </>
    );
}

export default UserWaiting;