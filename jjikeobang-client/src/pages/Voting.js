import React, { useRef } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import VoteResultModal from "../components/modal/VoteResultModal";

const voteResult = {
    signNumber : 1,
    name : '홍길동',
    description : '2학년 7반',
    promise : '학급에 최선을 다하겠습니다.',
    totVoteRate : 90,
    absRate : 10,
    totVoteCount : 100,
    candidateVoteRate : 45,
};

function Voting(){

    const handleCloseModal = () => {
       let closeBtn = document.getElementById('closeModal');
       closeBtn.click();
    }

    const linkBtnRef = useRef(null);
    const handleXButton = () => {
        if(linkBtnRef.current){
            linkBtnRef.current.click();
        }
    }

    return(
        <>
        <div className="container-fluid main-container">
            {/* 투표 컨테이너 */}
            <div className="row justify-content-center">
                <div className="col-lg-9">
                    <div className="waiting-container">
                        {/* 방 헤더 */}
                        <div className="room-header">
                            <div>
                                <h2 className="room-title">2학년 3반 반장 선거</h2>
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="room-code-label">입장 코드:</span>
                                <span className="room-code">XK42P9</span>
                                <button className="copy-btn ms-2">
                                    <i className="bi bi-clipboard"></i> 복사
                                </button>
                            </div>
                        </div>

                        {/* 메인 콘텐츠 */}

                        <div className="row">
                            {/* 왼쪽 영역 (후보자 목록) */}
                            <div className="col-md-7 vote-wrapper">
                                <div className="candidate-list">
                                    {/* 후보자 1 (선택됨) */}
                                    <div className="candidate-item selected" onClick="selectCandidate(1)">
                                        <div className="candidate-number">1번</div>
                                        <div className="candidate-info">
                                            <div className="candidate-name">김민준</div>
                                            <div className="candidate-description">2학년 7반</div>
                                            <div className="candidate-description">더 나은 학급을 만들겠습니다</div>
                                        </div>
                                        <button className="view-pledge-btn" data-bs-toggle="modal"
                                            data-bs-target="#pledgeModal1">
                                            공약보기
                                        </button>
                                    </div>

                                    {/* 후보자 2 */}
                                    <div className="candidate-item" onClick="selectCandidate(2)">
                                        <div className="candidate-number">2번</div>
                                        <div className="candidate-info">
                                            <div className="candidate-name">이서연</div>
                                            <div className="candidate-description">2학년 12반</div>
                                            <div className="candidate-description">모두가 행복한 교실을 만들겠습니다</div>
                                        </div>
                                        <button className="view-pledge-btn" data-bs-toggle="modal"
                                            data-bs-target="#pledgeModal1">
                                            공약보기
                                        </button>
                                    </div>

                                    {/* 후보자 3 */}
                                    <div className="candidate-item" onClick="selectCandidate(3)">
                                        <div className="candidate-number">3번</div>
                                        <div className="candidate-info">
                                            <div className="candidate-name">박지훈</div>
                                            <div className="candidate-description">2학년 15반</div>
                                            <div className="candidate-description">소통하는 반장이 되겠습니다</div>
                                        </div>
                                        <button className="view-pledge-btn" data-bs-toggle="modal"
                                            data-bs-target="#pledgeModal1">
                                            공약보기
                                        </button>
                                    </div>

                                    {/* 후보자 4 */}
                                    <div className="candidate-item" onClick="selectCandidate(3)">
                                        <div className="candidate-number">3번</div>
                                        <div className="candidate-info">
                                            <div className="candidate-name">박지훈</div>
                                            <div className="candidate-description">2학년 15반</div>
                                            <div className="candidate-description">소통하는 반장이 되겠습니다</div>
                                        </div>
                                        <button className="view-pledge-btn" data-bs-toggle="modal"
                                            data-bs-target="#pledgeModal1">
                                            공약보기
                                        </button>
                                    </div>
                                </div>

                                {/* 투표 버튼 */}
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <button className="btn vote-btn">투표하기</button>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <button className="btn cancel-btn">기권</button>
                                    </div>
                                </div>
                            </div>

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
                        <div className="row mt-4">
                            <div className="col-md-6 mb-3">
                                <div className="vote-status">
                                    <div className="vote-count-label">총 투표수</div>
                                    <div className="vote-count">12표</div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="vote-status">
                                    <div className="vote-time-label">남은 시간</div>
                                    <div className="vote-time">14분 47초</div>
                                </div>
                            </div>
                        </div>
                        <button className="view-pledge-btn" data-bs-toggle="modal" data-bs-target="#voteResultModal">
                            투표종료
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* 공약 모달 */}
        <div className="modal fade" id="pledgeModal1" tabindex="-1" aria-labelledby="pledgeModalLabel1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="pledgeModalLabel1">김민준</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h6>2학년 7반</h6>
                        <h6 className="mt-3">후보 공약</h6>
                        <div className="pledge-content">
                            더 나은 학급을 만들겠습니다
                            학급 소통 강화
                            공정한 의견 수렴
                            투명한 학급비 운영
                            즐거운 학급 분위기 조성
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                    </div>
                </div>
            </div>
        </div>

        {/* 투표 결과 모달 */}
        <VoteResultModal voteResult={voteResult}/>
        </>
    );
}

export default Voting;