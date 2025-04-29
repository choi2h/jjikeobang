function PromiseModal({name, description, promise}) {
    return (
        <div className="modal fade" id="pledgeModal1" aria-labelledby="pledgeModalLabel1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="pledgeModalLabel1">{name}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h6>{description}</h6>
                            <h6 className="mt-3">후보 공약</h6>
                            <div className="pledge-content">
                                {promise}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default PromiseModal;