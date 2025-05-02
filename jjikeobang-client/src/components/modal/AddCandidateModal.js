import { useEffect, useRef, useState } from "react";
import ModalButton from "../common/ModalButton";

function AddCandidateModal({addCandidate, editCandidate, candidate}) {
    //모달 닫힘 버튼
    const closeBtnRef = useRef(null);

    //등록, 수정 모달 구분분
    const [title, setTitle] = useState('');
    const [btnName, setBtnName] = useState('');
    
    //후보자 정보
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [promise, setPromise] = useState('');

    // 모달이 열릴 때마다 상태 초기화
    useEffect(() => {
        if (candidate) {
            setTitle('수정');
            setBtnName('수정하기');
            setId(candidate.id);
            setName(candidate.name);
            setDescription(candidate.description);
            setPromise(candidate.promise);
        } else {
            setTitle('등록');
            setBtnName('등록하기');
            setName('');
            setDescription('');
            setPromise('');
        }
    }, [candidate]);

    const candidateValid = () => {
        if (!name.trim()) {
            alert("후보자 이름을 입력해주세요.");
            return true;
        }

        if (!description.trim()) {
            alert("후보자 한줄 소개를를 입력해주세요.");
            return true;
        }

        if (!promise.trim()) {
            alert("후보자 공약을 입력해주세요.");
            return true;
        }
    };

    const handleAddCandidate = () => {
        if(candidateValid()){
            return;
        }

        addCandidate({name, description, promise});
        handleClose();

        closeBtnRef.current.click();
    };

    const handleEditCandidate = () => {
        if(candidateValid()){
            return;
        }

        editCandidate({id, name, description, promise});
        closeBtnRef.current.click();
    };

    const handleClose = () => {
        setName('');
        setDescription('');
        setPromise('');
    };
    
    return (
        <div className="modal fade" id="addCandidateModal" tabindex="-1" aria-labelledby="addCandidateModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addCandidateModalLabel">후보자 {title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeBtnRef} onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                {/* 후보자명 */}
                                <div className="mb-3">
                                    <label for="candidateName" className="form-label">후보자명</label>
                                    <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} className="form-control" id="candidateName" placeholder="후보자명을 입력하세요" />
                                </div>

                                {/* 후보자 한줄 소개 */}
                                <div className="mb-3">
                                    <label for="candidateDescription" className="form-label">후보자 한줄 소개</label>
                                    <input type="text" value={description} onChange={(e) => {setDescription(e.target.value)}} className="form-control" id="candidateDescription"
                                        placeholder="후보자 설명을 입력하세요" />
                                </div>

                                {/* 후보 공약 */}
                                <div className="mb-3">
                                    <label for="candidatePledge" className="form-label">후보 공약</label>
                                    <textarea value={promise} onChange={(e) => {setPromise(e.target.value)}} className="form-control" id="candidatePledge" rows="5"
                                        placeholder="후보 공약을 입력하세요"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <ModalButton type='regist' text={btnName} onClick={candidate ? handleEditCandidate : handleAddCandidate}/>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default AddCandidateModal;