import React from "react";

function ResultCandidateItemSet({ candidates }) {
  return (
    <div className="col-md-7 vote-wrapper">
      <div className="candidate-list">
        {candidates.map((candidate, index) => (
          <div key={candidate.candidateId}>
            {/* <ResultCandidateItem
              candidateInfo={candidate}
              number={index + 1}
            /> */}
          </div>
        ))}
      </div>

      {/* 투표 & 기권 버튼 비활성화할지 여부 필요
      <div className="row">
        <div className="col-md-6 mb-3">
          <button className="btn vote-btn">투표하기</button>
        </div>
        <div className="col-md-6 mb-3">
          <button className="btn cancel-btn">기권</button>
        </div>
      </div> */}
    </div>
  );
}

export default ResultCandidateItemSet;
