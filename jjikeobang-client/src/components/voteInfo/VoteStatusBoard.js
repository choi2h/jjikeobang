import React from "react";

function VoteStatusBoard({ totalAmount }) {
  return (
    <>
    <div className="row mt-4">
      <div className="col-md-6 mb-3">
        <div className="vote-status">
          <div className="vote-count-label">총 투표수</div>
          <div className="vote-count">{totalAmount}표</div>
        </div>
      </div>
      <div className="col-md-6 mb-3">
        <div className="vote-status">
          <div className="vote-time-label">남은 시간</div>
          <div className="vote-time">14분 47초</div>
        </div>
      </div>
    </div>
    </>
  );
}


export default VoteStatusBoard;
