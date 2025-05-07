import React from "react";

function CandidateItemSet({ candidates, selectedIndex, selectCandidate }) {
  return (
    <div className="col-md-7 vote-wrapper">
      <div className="candidate-list">
        {candidates.map((candidate, index) => {
          const modalId = `pledgeModal-${candidate.candidateId}`;
          const modalLabelId = `pledgeModalLabel-${candidate.candidateId}`;

          return (
            <React.Fragment key={candidate.candidateId}>
              <div
                className={`candidate-item ${selectedIndex === index ? "selected" : ""}`}
                onClick={() => selectCandidate(index)}
              >
                <div className="candidate-number">{index + 1}번</div>
                <div className="candidate-info">
                  <div className="candidate-name">{candidate.name}</div>
                  <div className="candidate-description">{candidate.description}</div>
                </div>
                <button
                  className="view-pledge-btn"
                  data-bs-toggle="modal"
                  data-bs-target={`#${modalId}`}
                >
                  공약보기
                </button>
              </div>

              {/* 공약 모달 */}
              <div
                className="modal fade"
                id={modalId}
                tabIndex="-1"
                aria-labelledby={modalLabelId}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id={modalLabelId}>
                        {candidate.name}
                      </h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <h6>{candidate.description}</h6>
                      <h6 className="mt-3">후보 공약</h6>
                      <div className="pledge-content">{candidate.promise}</div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                        닫기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
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
