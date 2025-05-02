import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import PromiseModal from "../components/modal/PromiseModal";
import Button from "../components/common/Button";
import Chat from "../components/chat/Chat";
import CandidateItem from "../components/voteInfo/CandidateItem";
import RoomHeader from "../components/voteInfo/RoomHeader";
import Profile from "../components/header/Profile";
import VoteStatusBoard from "../components/voteInfo/VoteStatusBoard";
import { useLocation } from "react-router-dom";

function AdminWaiting() {
  /* 
    //방정보, 후보자 정보 데이터 받는 부분
    const location = useLocation();
    const { roomInfo, candidates } = location.state || {};
  */
    const [candidates, setCandidates] = useState([]);
    const roomId = 1; //Q. 채팅방 별로 생성.. user 별 방 정보를 어떻게 얻어와야하지?. 일단 정적인 코드로 작성

    useEffect(() => {
        axios
            .get(`http://localhost:8080/jjikeobang/candidate?roomId=${roomId}`)
            .then((res)=>{
                if(res.data.statusCode===200){
                    setCandidates(res.data.candidates);
                }else{
                    console.log('에러 코드 :',res.data.statusCode);
                }
   
            })
            .catch((err)=>{
                console.error("후보자 목록 불러오기 실패:", err);
            });
    }, []);

    return (
        <>
            <div className="container-fluid main-container">
                {/* 상단 프로필 영역 */}
                <div className="row mb-4">
                    <div className="col-12 d-flex justify-content-end">
                        <Profile />
                    </div>
                </div>

                {/* 대기 컨테이너 */}
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="waiting-container">
                            {/* 방 헤더 */}
                            <RoomHeader title="2학년 3반 반장 선거" entryCode="XK42P9" />

                            {/* 메인 콘텐츠 */}
                            <div className="row">
                                {/* 왼쪽 영역 (후보자 목록) */}
                                <div className="col-md-7 vote-wrapper">
                                    <div className="candidate-list">
                                        {/* 후보자 */}
                                        {
                                            candidates.map((candidate, index) => {
                                                return <CandidateItem key={index} candidateInfo={candidate} number={index + 1} />
                                            })
                                        }
                                    </div>

                                    {/* 관리자 버튼 */}
                                    <div className="row mt-4">
                                        <div className="col-md-6 mb-3">
                                            <Button type='vote' text='투표하기' onClick={() => { console.log('투표하기 클릭') }} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <Button type='cancle' text='기권' onClick={() => { console.log('기권 클릭') }} />
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
                                <VoteStatusBoard label='총 득표수' content='12표' color='#1a4b8c ' />
                                <VoteStatusBoard label='남은 시간' content='14분 47초' color='#f59e0b ' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {
                candidates.map((candidate, index) => {
                    const modalId = `pledgeModal-${candidate.candidateId}`;
                    return (
                        <PromiseModal
                            key={index}
                            id={modalId}
                            name={candidate.name}
                            description={candidate.description}
                            promise={candidate.promise}
                        />
                    );
                })
            }

            {/* 부트스트랩 JS */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </>
    );
}

export default AdminWaiting;