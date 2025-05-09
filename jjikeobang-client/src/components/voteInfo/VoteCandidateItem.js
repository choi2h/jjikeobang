function CandidateItem({ candidateInfo, number, isSelected }) {
    const modalId = `pledgeModal-${candidateInfo.candidateId}`;
    const modalLabelId = `pledgeModalLabel-${candidateInfo.candidateId}`;
  
    return (
      <>
        <div className={`candidate-item ${isSelected ? "selected" : ""}`}>
          <div className="candidate-number">{number}번</div>
          <div className="candidate-info">
            <div className="candidate-name">{candidateInfo.name}</div>
            <div className="candidate-description">{candidateInfo.description}</div>
          </div>
          <div className="d-flex">
            <button className="view-pledge-btn" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
              공약보기
            </button>
          </div>
        </div>
  
        <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={modalLabelId} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={modalLabelId}>
                  {candidateInfo.name}
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <h6>{candidateInfo.description}</h6>
                <h6 className="mt-3">후보 공약</h6>
                <div className="pledge-content">{candidateInfo.promise}</div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default CandidateItem;
  