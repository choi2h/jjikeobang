import React from "react";
import PromiseModal from "../components/modal/PromiseModal";
import Button from "../components/common/Button";
import Chat from "../components/chat/Chat";
import CandidateItem from "../components/voteInfo/CandidateItem";
import RoomHeader from "../components/voteInfo/RoomHeader";
import Profile from "../components/header/Profile";
import VoteStatusBoard from "../components/voteInfo/VoteStatusBoard";

const candidates = [
    {
        number: 1,
        name: '김민준',
        description: '2학년 7반',
        promise: "더 나은 학급을 만들겠습니다 \n" +
        "학급 소통 강화 \n" +
        "공정한 의견 수렴 \n" + 
        "투명한 학급비 운영 \n" +
        "즐거운 학급 분위기 조성",
    },
    {
        number: 2,
        name: '이서연',
        description: '2학년 12반',
        promise: "모두가 행복한 교실을 만들겠습니다 \n" +
        "학급 친목 활동 강화 \n" +
        "학습 환경 개선 \n" + 
        "학급 행사 다양화 \n" +
        "소외되는 학생 없는 학급 문화 조성",
    },
    {
        number: 3,
        name: '박지훈',
        description: '2학년 15반',
        promise: "소통하는 반장이 되겠습니다 \n" +
        "학급 의견 수렴 창구 마련 \n" +
        "학급 문제 신속 해결 \n" + 
        "학급 활동 참여 독려 \n" +
        "모두의 의견이 존중받는 학급 문화 조성",
    }
]

function AdminWaiting(){
    return (
        <>
            <div className="container-fluid main-container">
                {/* 상단 프로필 영역 */}
                <div className="row mb-4">
                <div className="col-12 d-flex justify-content-end">
                    <Profile/>
                </div>
                </div>

                {/* 대기 컨테이너 */}
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="waiting-container">
                            {/* 방 헤더 */}
                            <RoomHeader title="2학년 3반 반장 선거" entryCode="XK42P9"/>

                            {/* 메인 콘텐츠 */}
                            <div className="row">
                                {/* 왼쪽 영역 (후보자 목록) */}
                                <div className="col-md-7 mb-4">
                                    {/* 후보자 */}
                                    {
                                        candidates.map((candidate, index) => {
                                            return <CandidateItem key={index} candidateInfo={candidate}/>
                                        })
                                    }

                                    {/* 관리자 버튼 */}
                                    <div className="row mt-4">
                                        <div className="col-md-6 mb-3">
                                            <Button type='vote' text='투표하기' onClick={() => {console.log('투표하기 클릭')}}/>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <Button type='cancle' text='기권' onClick={() => {console.log('기권 클릭')}}/>
                                        </div>
                                    </div>
                                </div>

                                {/* 오른쪽 영역 (채팅) */}
                                <div className="col-md-5">
                                    <Chat/>
                                </div>
                            </div>

                            {/* 투표 현황 */}
                            <div className="row mt-4">
                                <VoteStatusBoard label='총 득표수' content='12표' color='#1a4b8c '/>
                                <VoteStatusBoard label='남은 시간' content='14분 47초' color='#f59e0b '/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {
                candidates.map((candidate, index) => {
                    return <PromiseModal key={index} name={candidate.name} description={candidate.description} promise={candidate.promise}></PromiseModal>
                })
            }

            {/* 부트스트랩 JS */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </>
    );
}

export default AdminWaiting;