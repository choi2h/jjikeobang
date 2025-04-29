function CandidateItem ({candidateInfo}) {
    return (
        <div className="candidate-item">
            <div className="candidate-number">{candidateInfo.number}번</div>
            <div className="candidate-info">
                <div className="candidate-name">{candidateInfo.name}</div>
                <div className="candidate-description">{candidateInfo.description}</div>
                <div className="candidate-description">{candidateInfo.promise.split('\n')[0]}</div>
            </div>
            <div className="d-flex">
                <button className="view-pledge-btn" data-bs-toggle="modal" data-bs-target="#pledgeModal1">
                    공약보기
                </button>
            </div>

                {/* 부트스트랩 JS */}
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </div>
    );
}

export default CandidateItem;