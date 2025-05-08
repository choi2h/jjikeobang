import React, { useState } from "react";

import CandidateEditItem from "./CandidateEditItem";
import axios from 'axios';
import {addCandidate} from "../../service/CandidateService";
import voteInit from "../../service/VoteInitService";

function CandidateEditItemSet({ roomId, candidates, setCandidates, voteStart}) {
    console.log(`CandidateEnditItemSet roomId=${roomId} candidates=${JSON.stringify(candidates)}`)
    // 선택된 후보자의의 index 저장
    const [selectedIndex, setSelectedIndex] = useState(1);

    // 후보자 정보 수정
    const updateCandidateList = (type, candidate) => {
        let updatedList = [];
        if(type === 'DELETE') {
            updatedList = candidates.filter(item => item.id !== candidate.id);
        } else if(type === 'UPDATE') {
            updatedList = candidates.map(c =>
                c.id === candidate.id ? { ...c, ...candidate } : c
            );
        }

        setCandidates(updatedList);
        window.sessionStorage.setItem('candidates',JSON.stringify(updatedList));
    }

     // 후보자 클릭 (선택 시 selected 클래스 추가)
     const selectCandidate = (index) => {
        setSelectedIndex(index); // 클릭한 후보자의 index 번호 저장
      };

    const handleVoting = () => {
        const mappedCandidatesInfo = candidates.map(({ id, ...rest }, index) => ({
            ...rest,
            signNumber: index + 1,
            roomId
        }));
        
        //  후보자 정보 등록(확정)
        addCandidate(mappedCandidatesInfo).then((res) => {
            if(res.data.statusCode===200){
                // 후보자 투표 정보 초기화
                voteInit(roomId);
                // 채팅 시작 안내 - 채팅방 전달
                axios.get(`http://localhost:8080/notice/vote/start?roomId=${roomId}`, {
                    withCredentials: true
                });
                voteStart();
            } else {
                alert('후보자 등록에 실패했습니다.');
            }
        });
    };

    
    return (
        <>
            <div className="candidate-list">
                {/* 후보자 수정/삭제 목록 & 모달 출력 */}
                {
                    candidates.map((candidate, index) => {
                        return <CandidateEditItem 
                                    key={index}
                                    index={index} 
                                    candidate={candidate} 
                                    updateCandidateList={updateCandidateList} 
                                    isSelected={index === selectedIndex} 
                                    selectCandidate={selectCandidate} 
                                />
                    })
                }
            </div>

            {/* 투표 시작 버튼 */}
            <div className="d-flex justify-content-center">
                <div className="col-md-5 mb-3">
                    <button className="btn vote-btn" onClick={handleVoting}>투표 시작</button>
                </div>
            </div>
        </>
    );
}

export default CandidateEditItemSet;