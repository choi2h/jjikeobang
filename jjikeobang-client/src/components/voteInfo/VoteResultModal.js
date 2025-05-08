// VoteResultModal.jsx
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const VoteResultModal = ({ ref, winner, stats }) => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/');
    };

    
    return (
        <>
            <div className="modal fade" tabIndex="-1" aria-labelledby="voteResultModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="voteResultModalLabel">투표 결과</h5>
                            <button type="button" className="btn-close" onClick={handleRedirect} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="result-container">
                                <h2 className="result-title">🎉 당선을 축하합니다 🎉</h2>
                                <div className="winner-circle">{winner?.number}번</div>
                                <div className="winner-name">{winner?.name}</div>
                                <div className="winner-class">{winner?.class}</div>
                                <div className="winner-description mb-4">{winner?.description}</div>

                                <div className="progress result-progress">
                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${winner?.rate}%` }}
                                        aria-valuenow={winner?.rate} aria-valuemin="0" aria-valuemax="100">
                                        {winner?.rate}%
                                    </div>
                                </div>

                                <div className="vote-stats">
                                    <h4 className="stats-title">투표 통계</h4>
                                    <div className="stats-row">
                                        <div className="stats-label">총 투표수</div>
                                        <div className="stats-value">{stats?.total}</div>
                                    </div>
                                    <div className="stats-row">
                                        <div className="stats-label">투표율</div>
                                        <div className="stats-value">{stats?.rate}%</div>
                                    </div>
                                    <div className="stats-row">
                                        <div className="stats-label">기권</div>
                                        <div className="stats-value">{stats?.abstained}%</div>
                                    </div>
                                </div>

                                <button
                                type="button"
                                className="btn back-btn"
                                data-bs-dismiss="modal"
                                onClick={handleRedirect}
                                >
                                나가기
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.forwardRef((props, ref) => {
    const modalRef = useRef();
    React.useImperativeHandle(ref, () => ({
        open: () => modalRef.current?.open(),
        close: () => modalRef.current?.close(),
    }));

    return <VoteResultModal {...props} ref={modalRef} />;
});
