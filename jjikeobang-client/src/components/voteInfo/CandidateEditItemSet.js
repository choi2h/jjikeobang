import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import CandidateEditItem from "./CandidateEditItem";
import axios from 'axios';

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

        axios.post('http://localhost:8080/candidates', mappedCandidatesInfo)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    window.sessionStorage.removeItem('candidates');
                } else {
                    window.alert('에러 코드 : ', res.data.statusCode, '에러 메세지 : ', res.data.data);
                }
            })
            .catch((err) => {
                window.alert('후보자 DB 등록에 실패했습니다.', err);
            })
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