import React, { useState } from "react";
import CandidateItem from "./VoteCandidateItem"; // CandidateItem을 import



function CandidateItemSet({ candidates, roomId, voteService, voted }) {

  // 선택된 후보자의의 index 저장
  const [selectedIndex, setSelectedIndex] = useState(null);

  // 후보자 클릭 (선택 시 selected 클래스 추가)
  const selectCandidate = (index) => {
    setSelectedIndex(index); // 클릭한 후보자의 index 번호 저장
  };

  const handleVote = () => {
    if (selectedIndex === null) {
      alert("후보를 선택해주세요.");
      return;
    }

    const selectedCandidateId = candidates[selectedIndex].candidateId;
    voteService.sendMessage(JSON.stringify({
      candidateId: selectedCandidateId
    }));
    voted();
  };

  const handleAbstain = () => {
    voteService.sendMessage(JSON.stringify({
      candidateId: -1
    }));
    voted();
  };

  return (
    <>
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
          <button className="btn vote-btn" onClick={handleVote}>투표하기</button>
        </div>
        <div className="col-md-6 mb-3">
          <button className="btn cancel-btn" onClick={handleAbstain}>기권</button>
        </div>
      </div>
    </>
  );
}

export default CandidateItemSet;
