import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function VotingReady(){
    
    // 선택된 후보자의의 index 저장
    const [selectedIndex, setSelectedIndex] = useState(1);
    
    // 후보자 클릭 (선택 시 selected 클래스 추가)
    const selectCandidate = (index) => {
      setSelectedIndex(index); // 클릭한 후보자의 index 번호 저장
    };

    const navigate = useNavigate();
    const handleVoting = async() =>{
        navigate("/adminWaiting");
    };

    return (
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
                                        <div
                                            key="1"
                                            className={`candidate-item ${selectedIndex === 1 ? 'selected' : ''}`}
                                            onClick={() => selectCandidate(1)}
                                        >
                                            <div className="candidate-number">1번</div>
                                            <div className="candidate-info">
                                                <div className="candidate-name">김민준</div>
                                                <div className="candidate-description">2학년 7반</div>
                                                <div className="candidate-description">더 나은 학급을 만들겠습니다</div>
                                            </div>
                                            <button className="view-modify-btn" data-bs-toggle="modal"
                                                data-bs-target="#pledgeModal1" >
                                                수정
                                            </button>
                                            <button className="view-delete-btn">
                                                삭제
                                            </button>
                                        </div>

                                        {/* 후보자 2 */}
                                        <div
                                            key="2"
                                            className={`candidate-item ${selectedIndex === 2 ? 'selected' : ''}`}
                                            onClick={() => selectCandidate(2)}
                                        >
                                            <div className="candidate-number">2번</div>
                                            <div className="candidate-info">
                                                <div className="candidate-name">박라영</div>
                                                <div className="candidate-description">2학년 12반</div>
                                                <div className="candidate-description">소통하는 회장이 되겠습니다</div>
                                            </div>
                                            <button className="view-modify-btn" data-bs-toggle="modal"
                                                data-bs-target="#pledgeModal1" >
                                                수정
                                            </button>
                                            <button className="view-delete-btn">
                                                삭제
                                            </button>
                                        </div>

                                        {/* 후보자 3 */}
                                        <div
                                            key="3"
                                            className={`candidate-item ${selectedIndex === 3 ? 'selected' : ''}`}
                                            onClick={() => selectCandidate(3)}
                                        >
                                            <div className="candidate-number">3번</div>
                                            <div className="candidate-info">
                                                <div className="candidate-name">박지훈</div>
                                                <div className="candidate-description">2학년 15반</div>
                                                <div className="candidate-description">소통하는 반장이 되겠습니다</div>
                                            </div>
                                            <button className="view-modify-btn" data-bs-toggle="modal"
                                                data-bs-target="#pledgeModal1">
                                                수정
                                            </button>
                                            <button className="view-delete-btn">
                                                삭제
                                            </button>
                                        </div>
                                        {/* 후보자 4 */}
                                        <div
                                            key="4"
                                            className={`candidate-item ${selectedIndex === 4 ? 'selected' : ''}`}
                                            onClick={() => selectCandidate(4)}
                                        >
                                            <div className="candidate-number">4번</div>
                                            <div className="candidate-info">
                                                <div className="candidate-name">박지훈</div>
                                                <div className="candidate-description">2학년 15반</div>
                                                <div className="candidate-description">소통하는 반장이 되겠습니다</div>
                                            </div>
                                            <button className="view-modify-btn" data-bs-toggle="modal"
                                                data-bs-target="#pledgeModal1" >
                                                수정
                                            </button>
                                            <button className="view-delete-btn">
                                                삭제
                                            </button>
                                        </div>
                                    </div>

                                    {/* 투표 버튼 */}
                                    <div className="d-flex justify-content-center">
                                        <div className="col-md-5 mb-3">
                                            <button className="btn vote-btn" onClick={handleVoting}>투표 시작</button>
                                        </div>
                                    </div>
                                </div>

                                {/* 오른쪽 영역 (채팅) */}
                                <div className="col-md-5">
                                    <div className="chat-wrapper">
                                        <div className="chat-container">
                                            <div className="chat-message">
                                                <p className="mb-1">잠시만 기다려주세요. 곧 투표가 시작됩니다.</p>
                                                <div className="chat-time">08:55:45</div>
                                            </div>
                                            <div className="chat-message">
                                                <p className="mb-1">투표 시작 전까지 자유롭게 대화해주세요!</p>
                                                <div className="chat-time">08:57:15</div>
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
                                        <div className="vote-count">0표</div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="vote-status">
                                        <div className="vote-time-label">남은 시간</div>
                                        <div className="vote-time">15분 0초</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 공약 수정 모달*/}
            <div className="modal fade" id="pledgeModal1" tabindex="-1" aria-labelledby="pledgeModalLabel1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addCandidateModalLabel">후보자 수정</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                {/* 후보자명 */}
                                <div className="mb-3">
                                    <label for="candidateName" className="form-label">후보자명</label>
                                    <input type="text" className="form-control" id="candidateName" placeholder="후보자명을 입력하세요" />
                                </div>

                                {/* 후보자 한줄 소개 */}
                                <div className="mb-3">
                                    <label for="candidateDescription" className="form-label">후보자 한줄 소개</label>
                                    <input type="text" className="form-control" id="candidateDescription"
                                        placeholder="후보자 설명을 입력하세요" />
                                </div>

                                {/* 후보 공약 */}
                                <div className="mb-3">
                                    <label for="candidatePledge" className="form-label">후보 공약</label>
                                    <textarea className="form-control" id="candidatePledge" rows="5"
                                        placeholder="후보 공약을 입력하세요"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">수정하기</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 부트스트랩 JS */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </>
    );
}

export default VotingReady;