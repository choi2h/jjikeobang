import React from "react";

function VoteStartBtn({handleVoteStart}){
    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="col-md-5 mb-3">
                    <button className="btn vote-btn" onClick={handleVoteStart}>투표 시작</button>
                </div>
            </div>
        </>
    );
}

export default VoteStartBtn;