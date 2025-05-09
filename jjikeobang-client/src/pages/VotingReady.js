import React, { useState} from 'react';
import { useLocation } from 'react-router-dom';
import VoteStatusBoard from '../components/voteInfo/VoteStatusBoard';
import Chat from '../components/chat/Chat';
import axios from 'axios';
import VoteResultModal from '../components/modal/VoteResultModal';
import RoomHeader from '../components/voteInfo/RoomHeader';
import CandidateEditItem from '../components/voteInfo/CandidateEditItem';

const API_URL = process.env.REACT_APP_API_URL;

function VotingReady(){
    const location = useLocation();
    const room = location.state.roomInfo || {};
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);

    //후보자 목록 렌더링
    const [candidateList, setCandidateList] = useState(()=>{
        const sessionExist = sessionStorage.getItem('candidates');
        if(sessionExist){
            return JSON.parse(sessionExist);
        }

        const locationDataExist = location.state?.candidateList;
        if(locationDataExist){
            sessionStorage.setItem('candidates',JSON.stringify(locationDataExist));
            return locationDataExist;
        }
        return [];
    });

    // 후보자 DB 저장
    const handleVoting = () =>{
        const mappedCandidatesInfo = candidateList.map(({id,...rest}, index) => ({
            ...rest, 
            signNumber: index + 1,
            roomId: room.roomId
          }));

        axios.post('http://localhost:8080/candidates', mappedCandidatesInfo)
            .then((res)=>{
            if(res.data.statusCode===200){
                window.sessionStorage.removeItem('candidates');
            }else{
                window.alert('에러 코드 : ',res.data.statusCode, '에러 메세지 : ',res.data.data);
            }
          })
          .catch((err)=>{
            window.alert('후보자 DB 등록에 실패했습니다.',err);
          })
    };

    // 투표 종료 시 => 투표 결과 모달 출력
    const [isVoteResultModalOpen, setVoteResultModalOpen] = useState(false);
    const [voteResult, setVoteResult] = useState({});
    const handleVoteEnd = () => {
        fetch(`${API_URL}/vote/result`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "roomId=" + room.roomId,
            credentials: 'include'
            })
            .then((res) => {
                if (!res.ok) { throw new Error('서버 오류');}
                return res.json();
            })
            .then((voteResult) => {
                
                setVoteResult({
                    signNumber : voteResult.signNumber,
                    name : voteResult.name,
                    description : voteResult.description,
                    promise : voteResult.promise,
                    totVoteRate : voteResult.voteRate,
                    absRate : voteResult.absVoteRate,
                    totVoteCount : voteResult.totalEntryCount,
                    candidateVoteRate : voteResult.topCandidateVoteRate,
                });

                setVoteResultModalOpen(true);
            })
            .catch((err) => {
                console.error('에러 발생:', err);
                alert('투표 결과 조회 중 오류가 발생하였습니다.');
            });
    };

    return (
        <>
            <div className="container-fluid main-container">
                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        <div className="waiting-container">
                            
                            <RoomHeader title={room.name} entryCode={room.entryCode} />

                            <div className="row">
                                
                                <div className="col-md-7 vote-wrapper">
                                    <div className="candidate-list">
                                        {
                                            candidateList.map((candidate,index)=>{
                                                return <CandidateEditItem candidate={candidate} index={index} candidateList={candidateList} setCandidateList={setCandidateList} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
                                            })
                                        }
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <div className="col-md-5 mb-3">
                                            <button className="btn vote-btn" onClick={handleVoting}>투표 시작</button>
                                        </div>
                                    </div>
                                </div>

                                 <div className="col-md-5">
                                    <Chat/>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <VoteStatusBoard totalAmount={totalAmount} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {   
                isVoteResultModalOpen ? <VoteResultModal voteResult={voteResult} voteResultModalClose={() => setVoteResultModalOpen(false)}/> : <></>
            }
        </>
    );
}

export default VotingReady;