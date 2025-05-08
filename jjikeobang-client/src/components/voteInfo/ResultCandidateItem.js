import React from 'react';
function ResultCandidateItem({ candidateInfo, number }) {
    const voteRate = candidateInfo.voteRate || 0;

    return (
        <div className="candidate-item">
            <div className="candidate-number">{number}번</div>
            <div className="candidate-info">
                <div className="candidate-name">{candidateInfo.name}</div>
                <div className="candidate-description">{candidateInfo.description}</div>
            </div>
            <div className="w-100 mt-2">
                <div className="progress mb-3">
                    <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${voteRate}%` }}
                        aria-valuenow={voteRate}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        {voteRate}%
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultCandidateItem;