import Button from "../common/Button";

function AddCandidateModal({addCandidate}) {
    return (
        <div className="modal fade" id="addCandidateModal" tabindex="-1" aria-labelledby="addCandidateModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addCandidateModalLabel">후보자 등록</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                {/* 후보자명 */}
                                <div className="mb-3">
                                    <label for="candidateName" className="form-label">후보자명</label>
                                    <input type="text" className="form-control" id="candidateName" placeholder="후보자명을 입력하세요" />
                                </div>

                                {/* 후보자 한줄 소개 */}
                                <div className="mb-3">
                                    <label for="candidateDescription" className="form-label">후보자 한줄 소개</label>
                                    <input type="text" className="form-control" id="candidateDescription"
                                        placeholder="후보자 설명을 입력하세요" />
                                </div>

                                {/* 후보 공약 */}
                                <div className="mb-3">
                                    <label for="candidatePledge" className="form-label">후보 공약</label>
                                    <textarea className="form-control" id="candidatePledge" rows="5"
                                        placeholder="후보 공약을 입력하세요"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <Button type='primary' text='등록하기' onClick={addCandidate}/>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default AddCandidateModal;