import React, {useState, useEffect} from "react";

function VoteStatusBoard({ totalAmount, voteDuration }) {
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const minutes = Math.floor(voteDuration / 60);
    const seconds = voteDuration % 60;
    setFormattedTime(`${minutes}분 ${seconds < 10 ? "0" : ""}${seconds}초`);
  }, [voteDuration]);

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
          <div className="vote-time">{formattedTime}</div>
        </div>
      </div>
    </div>
    </>
  );
}


export default VoteStatusBoard;
