import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import CandidateEditItem from "./CandidateEditItem";
import axios from 'axios';
import addCandidate from "../../service/AddCandidateService";

function CandidateEditItemSet({ selectedIndex, setSelectedIndex }) {

    const location = useLocation();
    const room = location.state.roomInfo || {};
    //후보자 목록 렌더링
    const [candidateList, setCandidateList] = useState(() => {
        const sessionExist = sessionStorage.getItem('candidates');
        if (sessionExist) {
            return JSON.parse(sessionExist);
        }

        const locationDataExist = location.state?.candidateList;
        if (locationDataExist) {
            sessionStorage.setItem('candidates', JSON.stringify(locationDataExist));
            return locationDataExist;
        }
        return [];
    });

    const handleVoting = () => {
        const mappedCandidatesInfo = candidateList.map(({ id, ...rest }, index) => ({
            ...rest,
            signNumber: index + 1,
            roomId: room.roomId
        }));
        
        //  후보자 정보 등록(확정)
        addCandidate(mappedCandidatesInfo);
        // 후보자 투표 정보 초기화
        voteInit();
        // 채팅 시작 안내 - 채팅방 전달
        axios.get(`http://localhost:8080/notice/vote/start?roomId=${room.roomId}`, {
            withCredentials: true
        })
    };

    const voteInit = () => {
        axios.get(`http://localhost:8080/vote-start?roomId=${room.roomId}`, {
            withCredentials: true
        })
        .then((res) => {
            if (res.status === 200) {
                
            } else {
                console.log("투표 초기화 실패 : ", res.status);
            }
        })
        .catch((error) => {
            console.error("투표 시작 중 오류 발생 : ", error);
        });
    };

    return (
        <div className="col-md-7 vote-wrapper">
            <div className="candidate-list">
                {/* 후보자 수정/삭제 목록 & 모달 출력 */}
                {
                    candidateList.map((candidate, index) => {
                        return <CandidateEditItem candidate={candidate} index={index} candidateList={candidateList} setCandidateList={setCandidateList} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
                    })
                }
            </div>

            {/* 투표 시작 버튼 */}
            <div className="d-flex justify-content-center">
                <div className="col-md-5 mb-3">
                    <button className="btn vote-btn" onClick={handleVoting}>투표 시작</button>
                </div>
            </div>
        </div>
    );
}

export default CandidateEditItemSet;