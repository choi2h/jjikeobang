import React from "react";
import { Link } from "react-router-dom";

function AdminWaiting(){
    return (
        <>
            <div className="container-fluid main-container">
                {/* 상단 프로필 영역 */}
                <div className="row mb-4">
                    <div className="col-12 d-flex justify-content-end">
                        <div className="dropdown profile-dropdown">
                            <button className="btn profile-btn dropdown-toggle" type="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                <div className="profile-circle">
                                    <span>김</span>
                                </div>
                                <span className="profile-name">김철수</span>
                                <i className="bi bi-chevron-down"></i>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                                <li><Link className="dropdown-item" to="voting-history.html">지난 투표 기록</Link></li>
                                <li><Link className="dropdown-item" to="index.html">로그아웃</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 대기 컨테이너 */}
                <div className="row justify-content-center">
                    <div className="col-lg-8">
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
                                <div className="col-md-7 mb-4">
                                    {/* 후보자 1 */}
                                    <div className="candidate-item">
                                        <div className="candidate-number">1번</div>
                                        <div className="candidate-info">
                                            <div className="candidate-name">김민준</div>
                                            <div className="candidate-description">2학년 7반</div>
                                            <div className="candidate-description">더 나은 학급을 만들겠습니다</div>
                                        </div>
                                        <div className="d-flex">
                                            <button className="view-pledge-btn" data-bs-toggle="modal" data-bs-target="#pledgeModal1">
                                                공약보기
                                            </button>
                                        </div>
                                    </div>

                                    {/* 후보자 2 */}
                                    <div className="candidate-item">
                                        <div className="candidate-number">2번</div>
                                        <div className="candidate-info">
                                            <div className="candidate-name">이서연</div>
                                            <div className="candidate-description">2학년 12반</div>
                                            <div className="candidate-description">모두가 행복한 교실을 만들겠습니다</div>
                                        </div>
                                        <div className="d-flex">
                                            <button className="view-pledge-btn" data-bs-toggle="modal" data-bs-target="#pledgeModal2">
                                                공약보기
                                            </button>
                                        </div>
                                    </div>

                                    {/* 후보자 3 */}
                                    <div className="candidate-item">
                                        <div className="candidate-number">3번</div>
                                        <div className="candidate-info">
                                            <div className="candidate-name">박지훈</div>
                                            <div className="candidate-description">2학년 15반</div>
                                            <div className="candidate-description">소통하는 반장이 되겠습니다</div>
                                        </div>
                                        <div className="d-flex">
                                            <button className="view-pledge-btn" data-bs-toggle="modal" data-bs-target="#pledgeModal3">
                                                공약보기
                                            </button>
                                        </div>
                                    </div>

                                    {/* 관리자 버튼 */}
                                    <div className="row mt-4">
                                        <div className="col-md-6 mb-3">
                                            <button className="btn vote-btn">투표 시작하기</button>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <button className="btn cancel-btn">기권</button>
                                        </div>
                                    </div>
                                </div>

                                {/* 오른쪽 영역 (채팅) */}
                                <div className="col-md-5">
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
                        </div>
                    </div>
                </div>
            </div>

            {/* 공약 모달 1 */}
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

            {/* 공약 모달 2 */}
            <div className="modal fade" id="pledgeModal2" tabindex="-1" aria-labelledby="pledgeModalLabel2" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="pledgeModalLabel2">이서연</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h6>2학년 12반</h6>
                            <h6 className="mt-3">후보 공약</h6>
                            <div className="pledge-content">
        모두가 행복한 교실을 만들겠습니다
        학급 친목 활동 강화
        학습 환경 개선
        학급 행사 다양화
        소외되는 학생 없는 학급 문화 조성
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 공약 모달 3 */}
            <div className="modal fade" id="pledgeModal3" tabindex="-1" aria-labelledby="pledgeModalLabel3" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="pledgeModalLabel3">박지훈</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h6>2학년 15반</h6>
                            <h6 className="mt-3">후보 공약</h6>
                            <div className="pledge-content">
        소통하는 반장이 되겠습니다
        학급 의견 수렴 창구 마련
        학급 문제 신속 해결
        학급 활동 참여 독려
        모두의 의견이 존중받는 학급 문화 조성
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 부트스트랩 JS */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </>
    );
}

export default AdminWaiting;