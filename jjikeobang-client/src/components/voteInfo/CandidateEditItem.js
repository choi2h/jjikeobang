import CandidateEditModal from "../modal/CandidateEditModal";

function CandidateEditItem({index, candidate, updateCandidateList, isSelected, selectCandidate}){
    console.log(`CandidateEditItem candidate=${JSON.stringify(candidate)}`);
    const modalId = `pledgeModal-${candidate.id}`;

    //후보자 삭제 
    const handleDelete = (candidate)=>{
        const confirm = window.confirm('삭제하시겠습니까?');
        if(confirm){
            updateCandidateList('DELETE', candidate)
        }
    }

    return (
        <>
            <div key={candidate.id}>
                <div className={`candidate-item ${isSelected? 'selected' : ''}`} onClick={() => selectCandidate(index)}>
                    <div className="candidate-number">{index+1}번</div>
                    <div className="candidate-info">
                        <div className="candidate-name">{candidate.name}</div>
                        <div className="candidate-description">{candidate.description}</div>
                    </div>
                    <button className="view-modify-btn" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>수정</button>
                    <button className="view-delete-btn" onClick={() => handleDelete(candidate)}>삭제</button>
                </div>

                {/* 공약 수정 모달*/}
                <CandidateEditModal candidate={candidate} updateCandidateList={updateCandidateList} modalId={modalId}/>
            </div>
        </>
    );
}

export default CandidateEditItem;