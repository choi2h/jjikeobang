import React, { useState } from "react";
import CandidateEditModal from "../modal/CandidateEditModal";

function CandidateEditItem({candidate, index, candidateList, setCandidateList, selectedIndex, setSelectedIndex}){

    
    const modalId = `pledgeModal-${candidate.id}`;

    //후보자 삭제 
    const handleDelete = (id)=>{
        if(candidateList.length===1){
            window.alert('후보자는 최소 1명 이상 존재해야 합니다.');
            return;
        }

        const confirm = window.confirm('삭제하시겠습니까?');
        if(confirm){
            const updatedList = candidateList.filter(item => item.id !== id);
            setCandidateList(updatedList);
            window.sessionStorage.setItem('candidates',JSON.stringify(updatedList));
        }
    }

    return (
        <>
            <div key={candidate.id}>
                <div className={`candidate-item ${selectedIndex === index ? 'selected' : ''}`} onClick={() => setSelectedIndex(index)}>
                    <div className="candidate-number">{index+1}번</div>
                    <div className="candidate-info">
                        <div className="candidate-name">{candidate.name}</div>
                        <div className="candidate-description">{candidate.description}</div>
                    </div>
                    <button className="view-modify-btn" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>수정</button>
                    <button className="view-delete-btn" onClick={() => handleDelete(candidate.id)}>삭제</button>
                </div>

                {/* 공약 수정 모달*/}
                <CandidateEditModal candidate={candidate} candidateList={candidateList} setCandidateList={setCandidateList} modalId={modalId}/>
            </div>
        </>
    );
}

export default CandidateEditItem;