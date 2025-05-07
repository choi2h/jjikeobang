import React, { useRef } from "react";
import { Link } from "react-router-dom";

function VoteResultModal(){

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

    return (
        <>
            <div className="modal fade" id="voteResultModal" tabindex="-1" aria-labelledby="voteResultModalLabel" aria-hidden="true">
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
                                <div className="winner-circle">
                                    1번
                                </div>
                                <div className="winner-name">
                                    김민준
                                </div>
                                <div className="winner-class">
                                    2학년 7반
                                </div>
                                <div className="winner-description mb-4">
                                    더 나은 학급을 만들겠습니다.
                                </div>

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

export default VoteResultModal;