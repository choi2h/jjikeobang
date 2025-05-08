import React from "react";
import ResultCandidateItem from './ResultCandidateItem'

function ResultCandidateItemSet({ candidates, totalVote }) {

  return (
    <div className="candidate-list">
      {candidates.map((candidate, index) => {
        const voteRate = totalVote > 0
          ? Math.min(100, Math.max(1, Math.floor((candidate.voteCount / totalVote) * 100)))
          : 0;

        return (
          <div key={candidate.candidateId}>
            <ResultCandidateItem
              candidateInfo={{ ...candidate, voteRate }}
              number={index + 1}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ResultCandidateItemSet;
