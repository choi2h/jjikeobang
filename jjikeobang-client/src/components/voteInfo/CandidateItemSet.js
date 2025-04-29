import Button from "../common/Button";

function CandidateItemSet ({candidate}) {
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
                <Button type='modify' onClick={()=>{'수정 버튼 클릭'}}/>
                <Button type='delete' onClick={()=>{'삭제 버튼 클릭'}}/>
            </div>
        </div>
    );
}

export default CandidateItemSet;