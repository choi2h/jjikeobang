import React, { useRef , useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// 컴포넌트 분리된 부분 import
import RoomHeader from "../components/voteInfo/RoomHeader";
import CandidateItemSet from "../components/voteInfo/CandidateItemSet";
import VoteStatusBoard from "../components/voteInfo/VoteStatusBoard";

function Voting() {
    const roomId = 1; //Q. static 코딩, 유저가 접속한 방의 roomId를 받아와야함.
    const [candidates, setCandidates] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/jjikeobang/candidate?roomId=${roomId}`)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    setCandidates(res.data.candidates);
                } else {
                    console.log("에러 코드:", res.data.statusCode);
                }
            })
            .catch((err) => {
                console.error("후보자 목록 불러오기 실패:", err);
            });
    }, []);

    // 후보자 클릭 (선택 시 selected 클래스 추가)
    const selectCandidate = (index) => {
        setSelectedIndex(index);
    };

    const handleCloseModal = () => {
        let closeBtn = document.getElementById("closeModal");
        closeBtn.click();
    };

    const linkBtnRef = useRef(null);
    const handleXButton = () => {
        if (linkBtnRef.current) {
            linkBtnRef.current.click();
        }
    };

    return (
        <>
        <div className="container-fluid main-container">
            {/* 투표 컨테이너 */}
            <div className="row justify-content-center">
                <div className="col-lg-9">
                    <div className="waiting-container">
                        {/* 방 헤더 */}
                        <RoomHeader title="2학년 3반 반장 선거" entryCode="XK42P9" />

                        {/* 메인 콘텐츠 */}
                        <div className="row">
                            {/* 왼쪽 영역 (후보자 목록) */}
                            <CandidateItemSet
                                candidates={candidates}
                                selectedIndex={selectedIndex}
                                selectCandidate={selectCandidate}
                            />

                            {/* 오른쪽 영역 (채팅) */}
                            <div className="col-md-5">
                                <div className="chat-wrapper">
                                    <div className="chat-container">
                                        <div className="notify-message">
                                            <p className="mb-1" style={{ fontWeight: 'bold' }}>잠시만 기다려주세요. 곧 투표가 시작됩니다.</p>
                                            <div className="chat-time">08:55:45</div>
                                        </div>
                                        <div className="notify-message">
                                            <p className="mb-1" style={{ fontWeight: 'bold' }}>투표 시작 전까지 자유롭게 대화해주세요!</p>
                                            <div className="chat-time">08:57:15</div>
                                        </div>
                                        <div className="notify-message">
                                            <p className="mb-1" style={{ fontWeight: 'bold' }}>🚨 투표가 시작되었습니다!</p>
                                            <div className="chat-time">08:57:15</div>
                                        </div>
                                        <div className="chat-message">
                                            <p className="mb-1">익명03: 모두 파이팅입니다!🔥</p>
                                            <div className="chat-time">09:02:45</div>
                                        </div>
                                    </div>
                                    <div className="chat-input-container">
                                        <input type="text" className="chat-input" placeholder="메시지를 입력하세요..." />
                                        <button className="chat-send-btn">
                                            <i className="bi bi-send"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 투표 현황 */}
                        <VoteStatusBoard />

                        <button className="view-pledge-btn" data-bs-toggle="modal" data-bs-target="#voteResultModal">
                            투표종료
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* 투표 결과 모달 */}
        <div className="modal fade" id="voteResultModal" tabIndex="-1" aria-labelledby="voteResultModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="voteResultModalLabel">투표 결과</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleXButton}></button>
                    </div>
                    <div className="modal-body">
                        {/* 결과 컨테이너 */}
                        <div className="result-container">
                            {/* 결과 헤더 */}
                            <h2 className="result-title">🎉 당선을 축하합니다 🎉</h2>

                            {/* 당선자 정보 */}
                            <div className="winner-circle">1번</div>
                            <div className="winner-name">김민준</div>
                            <div className="winner-class">2학년 7반</div>
                            <div className="winner-description mb-4">더 나은 학급을 만들겠습니다.</div>

                            {/* 투표 결과 그래프 */}
                            <div className="progress result-progress">
                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: '42%' }}
                                    aria-valuenow="42" aria-valuemin="0" aria-valuemax="100">42%</div>
                            </div>

                            {/* 투표 통계 */}
                            <div className="vote-stats">
                                <h4 className="stats-title">투표 통계</h4>
                                <div className="stats-row">
                                    <div className="stats-label">총 투표수</div>
                                    <div className="stats-value">100표</div>
                                </div>
                                <div className="stats-row">
                                    <div className="stats-label">투표율</div>
                                    <div className="stats-value">96%</div>
                                </div>
                                <div className="stats-row">
                                    <div className="stats-label">기권</div>
                                    <div className="stats-value">4%</div>
                                </div>
                            </div>

                            {/* 돌아가기 버튼 */}
                            <Link to="/dashboard" className="btn back-btn" onClick={handleCloseModal} ref={linkBtnRef}>
                                나가기
                            </Link>

                            <button id="closeModal" type="button" className="btn btn-secondary" data-bs-dismiss="modal" hidden={true}>닫기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Voting;