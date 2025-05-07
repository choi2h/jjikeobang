import React, { useState } from "react";

function CandidateItem ({candidates, setCandidate, selectedCandidateId, setSelectedCandidateId}) {
    
    const handleSelectedCandidate = (candidateId) => {
        console.log('candidates', candidates);
        console.log('선택된 ID:', candidateId);
        setSelectedCandidateId(candidateId);
    };

    return (
        <>
            {
                candidates.map((candidate, idx) => {
                    return (
                        <div className={`candidate-item ${selectedCandidateId === candidate.candidateId ? "selected" : ""}`} onClick={() => handleSelectedCandidate(candidate.candidateId)}>
                            <div className="candidate-number">{candidate.signNumber}번</div>
                            <div className="candidate-info">
                                <div className="candidate-name">{candidate.name}</div>
                                <div className="candidate-description">{candidate.description}</div>
                            </div>
                            <div className="d-flex">
                                <button className="view-pledge-btn" data-bs-toggle="modal" data-bs-target="#promiseModal" onClick={() => setCandidate(candidate)}>
                                    공약보기
                                </button>
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
}

export default CandidateItem;