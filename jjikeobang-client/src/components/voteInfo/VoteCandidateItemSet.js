import React from "react";
import CandidateItem from "./VoteCandidateItem"; // CandidateItem을 import

function CandidateItemSet({ candidates, selectedIndex, selectCandidate }) {
  return (
    <div className="col-md-7 vote-wrapper">
      <div className="candidate-list">
        {candidates.map((candidate, index) => (
          <div key={candidate.candidateId} onClick={() => selectCandidate(index)}>
            <CandidateItem
              candidateInfo={candidate}
              number={index + 1}
              isSelected={selectedIndex === index}
            />
          </div>
        ))}
      </div>

      {/* 투표 & 기권 버튼 */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <button className="btn vote-btn">투표하기</button>
        </div>
        <div className="col-md-6 mb-3">
          <button className="btn cancel-btn">기권</button>
        </div>
      </div>
    </div>
  );
}

export default CandidateItemSet;
