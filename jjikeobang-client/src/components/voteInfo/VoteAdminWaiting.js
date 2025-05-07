import React from 'react';

function VoteAdminWaiting({candidates, setCandidates, setCandidate}){

    const openModalForEdit = (candidate) => {
        setCandidate(candidate);
    };
    
    const deleteCandidate = (id) => {
        if(candidates.length <= 1){
            alert("최소 1명 이상의 후보자가 존재해야 합니다.");
            return;
        }
    
        if (window.confirm('삭제하시겠습니까?')) {
            setCandidates(candidates.filter((c) => c.candidateId !== id));
        }
    };

    return (
        <>
            {
                candidates.map((candidate, idx) => {
                    return (
                        <div key={idx} className="candidate-item">
                            <div className="candidate-number">{idx+1}번</div>
                            <div className="candidate-info">
                                <div className="candidate-name">{candidate.name}</div>
                                <div className="candidate-description">{candidate.description}</div>
                                <div className="candidate-description">{candidate.promise}</div>
                            </div>
                            <button className="view-modify-btn" data-bs-toggle="modal" 
                                    data-bs-target="#addCandidateModal" onClick={() => openModalForEdit(candidate)}>
                                수정
                            </button>
                            <button className="view-delete-btn" onClick={() => deleteCandidate(candidate.candidateId)}>
                                삭제
                            </button>
                        </div>
                    );
                })
            }
        </>
    );
}

export default VoteAdminWaiting;