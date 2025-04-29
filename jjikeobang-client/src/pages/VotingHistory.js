import React from "react";
import Profile from "../components/header/Profile";
import Logo from "../components/header/Logo";

function VotingHistory(){
    return(
        <>
            {/* 상단 프로필 영역 */}
            <nav className="navbar mb-4">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <Logo/>
                <Profile/>
            </div>
            </nav>
            
            <div class="container-fluid main-container">
                {/* 지난 투표 기록 */}
                <div class="history-container">
                    <h1 class="history-title">지난 투표 기록</h1>

                    {/* 투표 기록 카드 */}
                    <div class="history-card">
                        <div class="history-date">2024-01-15</div>
                        <div class="history-name">2024년 1학기 반장 선거</div>
                        <div class="history-winner">
                            <div class="history-winner-number">1번</div>
                            <div class="history-winner-name">김민수</div>
                            <div class="history-winner-percent">45%</div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-2">김민수</div>
                                <div class="progress mb-3">
                                    <div class="progress-bar bg-primary" role="progressbar" style={{ width: "45%" }}
                                        aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="col-md-6 text-end">
                                <div>45%</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-2">이지원</div>
                                <div class="progress mb-3">
                                    <div class="progress-bar bg-primary" role="progressbar" style={{ width: "35%" }}
                                        aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="col-md-6 text-end">
                                <div>35%</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-2">박준호</div>
                                <div class="progress mb-3">
                                    <div class="progress-bar bg-primary" role="progressbar" style={{ width: "15%" }}
                                        aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="col-md-6 text-end">
                                <div>15%</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-2">기권</div>
                                <div class="progress mb-3">
                                    <div class="progress-bar bg-primary" role="progressbar" style={{ width: "5%" }} aria-valuenow="5"
                                        aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="col-md-6 text-end">
                                <div>5%</div>
                            </div>
                        </div>
                        <div class="text-end mt-3">
                            <small>총 투표수: 28명</small>
                        </div>
                    </div>

                    {/* 투표 기록 카드 (반복) */}
                    <div class="history-card">
                        <div class="history-date">2024-01-15</div>
                        <div class="history-name">2024년 1학기 반장 선거</div>
                        <div class="history-winner">
                            <div class="history-winner-number">1번</div>
                            <div class="history-winner-name">김민수</div>
                            <div class="history-winner-percent">45%</div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-2">김민수</div>
                                <div class="progress mb-3">
                                    <div class="progress-bar bg-primary" role="progressbar" style={{ width: "45%" }}
                                        aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="col-md-6 text-end">
                                <div>45%</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-2">이지원</div>
                                <div class="progress mb-3">
                                    <div class="progress-bar bg-primary" role="progressbar" style={{ width: "35%" }}
                                        aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="col-md-6 text-end">
                                <div>35%</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-2">박준호</div>
                                <div class="progress mb-3">
                                    <div class="progress-bar bg-primary" role="progressbar" style={{ width: "15%" }}
                                        aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="col-md-6 text-end">
                                <div>15%</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-2">기권</div>
                                <div class="progress mb-3">
                                    <div class="progress-bar bg-primary" role="progressbar" style={{ width: "5%" }} aria-valuenow="5"
                                        aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="col-md-6 text-end">
                                <div>5%</div>
                            </div>
                        </div>
                        <div class="text-end mt-3">
                            <small>총 투표수: 28명</small>
                        </div>
                    </div>

                    {/* 투표 기록 카드 (반복) */}
                    <div class="history-card">
                        <div class="history-date">2024-01-15</div>
                        <div class="history-name">2024년 1학기 반장 선거</div>
                        <div class="history-winner">
                            <div class="history-winner-number">1번</div>
                            <div class="history-winner-name">김민수</div>
                            <div class="history-winner-percent">45%</div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-2">김민수</div>
                                <div class="progress mb-3">
                                    <div class="progress-bar bg-primary" role="progressbar" style={{ width: "45%" }}
                                        aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="col-md-6 text-end">
                                <div>45%</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-2">이지원</div>
                                <div class="progress mb-3">
                                    <div class="progress-bar bg-primary" role="progressbar" style={{ width: "35%" }}
                                        aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="col-md-6 text-end">
                                <div>35%</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-2">박준호</div>
                                <div class="progress mb-3">
                                    <div class="progress-bar bg-primary" role="progressbar" style={{ width: "15%" }}
                                        aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="col-md-6 text-end">
                                <div>15%</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-2">기권</div>
                                <div class="progress mb-3">
                                    <div class="progress-bar bg-primary" role="progressbar" style={{ width: "5%" }} aria-valuenow="5"
                                        aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="col-md-6 text-end">
                                <div>5%</div>
                            </div>
                        </div>
                        <div class="text-end mt-3">
                            <small>총 투표수: 28명</small>
                        </div>
                    </div>
                </div>
            </div>

            {/* 부트스트랩 JS */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </>
    );
}

export default VotingHistory;