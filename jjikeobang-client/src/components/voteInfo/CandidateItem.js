function CandidateItem ({candidateInfo,number}) {

    const modalId = `pledgeModal-${candidateInfo.candidateId}`;

    return (
        <div className="candidate-item">
            <div className="candidate-number">{number}번</div>
            <div className="candidate-info">
                <div className="candidate-name">{candidateInfo.name}</div>
                <div className="candidate-description">{candidateInfo.description}</div>
            </div>
            <div className="d-flex">
                <button className="view-pledge-btn" data-bs-toggle="modal" data-bs-target={`#${modalId}`} >
                    공약보기
                </button>
            </div>

                {/* 부트스트랩 JS */}
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </div>

        
        
    );

    
}

export default CandidateItem;