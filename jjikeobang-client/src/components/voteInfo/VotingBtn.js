import React from "react";

function VotingBtn({handleVoting, selectedCandidateId, candidates}){
    const confirmAndVote = () => {
        if(!selectedCandidateId){
            alert("선택된 후보자가 없습니다.");
            return;
        }
        
        const candidate = candidates.find(
            (candidate) => candidate.candidateId === selectedCandidateId
        );

        const confirmMsg = candidate.signNumber + '번 ' + candidate.name + '에게 투표하시겠습니까?';
        
        if(window.confirm(confirmMsg)){
            handleVoting('VOTE');
        }
    };
        
    const confirmAndAbst = () => {
        if(window.confirm('기권하시겠습니까?')){
            handleVoting('ABST');
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <button className="btn vote-btn" onClick={confirmAndVote}>투표하기</button>
                </div>
                <div className="col-md-6 mb-3">
                    <button className="btn cancel-btn" onClick={confirmAndAbst}>기권</button>
                </div>
            </div>
        </>
    );
}

export default VotingBtn;