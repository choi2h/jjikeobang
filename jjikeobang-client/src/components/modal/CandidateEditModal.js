import React, { useState } from "react";

function CandidateEditModal({candidate, updateCandidateList, modalId}){
    const [name, setName] = useState(candidate.name);
    const [description, setDescription] = useState(candidate.description);
    const [promise, setPromise] = useState(candidate.promise);
    
    //후보자 수정 
    const handleModify = ()=>{
        if(!candidate.name || !candidate.description || !candidate.promise){
            window.alert('입력되지 않은 항목이 있습니다.')
            return;
        }

        const id = candidate.id;
        const updatedCandidate = { id, name, description, promise };
        updateCandidateList('UPDATE', updatedCandidate);
        window.alert('수정되었습니다');
    }

    return (
        <div className="modal fade" id={modalId} tabindex="-1" aria-labelledby={`${modalId}-label`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={`${modalId}-label`}>후보자 수정</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            {/* 후보자명 */}
                            <div className="mb-3">
                                <label for="candidateName" className="form-label">후보자명</label>
                                <input type="text" className="form-control" id="candidateName" value={name} onChange={(e)=>{setName(e.target.value)}} />
                            </div>

                            {/* 후보자 한줄 소개 */}
                            <div className="mb-3">
                                <label for="candidateDescription" className="form-label">후보자 한줄 소개</label>
                                <input type="text"
                                        className="form-control"
                                        id="candidateDescription"
                                        value={description}
                                        onChange={(e)=>{
                                        setDescription(e.target.value)
                                        }} />
                            </div>

                            {/* 후보 공약 */}
                            <div className="mb-3">
                                <label for="candidatePledge" className="form-label">후보 공약</label>
                                <textarea className="form-control" 
                                            id="candidatePledge" 
                                            rows="5"
                                            value={promise}
                                            onChange={(e)=>{
                                            setPromise(e.target.value)
                                            }}></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" 
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={()=>{handleModify()}}>수정하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CandidateEditModal;