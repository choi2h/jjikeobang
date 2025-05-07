import Button from "../common/Button";
import ModalButton from "../common/ModalButton";

function CandidateItemSet ({candidate, modalId, openModalForEdit, deleteCandidate}) {

    const handleEdit = () => {
        openModalForEdit(candidate);
    };

    const handleDel = () => {
        deleteCandidate(candidate.candidateId);
    };

    return (
        <div className="candidate-card">
            <div className="candidate-info">
                <p style={{ fontWeight: 'bold' }}>후보자명: {candidate.name}</p>
                <div className="candidate-description">
                    <p style={{ fontWeight: 500, marginTop: '5px' }}>후보 공약</p>
                    <div className="candidate-promise">
                        {candidate.promise}
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <ModalButton type='modify' modalId={modalId} onClick={handleEdit}/>
                <Button type='delete' onClick={handleDel}/>
            </div>
        </div>
    );
}

export default CandidateItemSet;