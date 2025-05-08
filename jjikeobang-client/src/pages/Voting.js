import React, { useRef, useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Chat from "../components/chat/Chat";
import VoteStatusBoard from "../components/voteInfo/VoteStatusBoard";
import VoteResultModal from "../components/modal/VoteResultModal";
import VoteSocketService from "../service/VoteSocketService";
import UserWaitingBoard from "../components/voteInfo/UserWaitingBoard";
import CandidateEditItemSet from "../components/voteInfo/CandidateEditItemSet";
import VoteCandidateItemSet from "../components/voteInfo/VoteCandidateItemSet";
import ResultCandidateItemSet from "../components/voteInfo/ResultCandidateItemSet";
import RoomHeader from "../components/voteInfo/RoomHeader";

const API_URL = process.env.REACT_APP_API_URL;
function Voting() {
    const location = useLocation();
    const roomInfo = location.state.roomInfo || {};
    const roomId = roomInfo.roomId;

    const [progress, setProgress] = useState(0); // 0: 대기 화면, 1: 후보자 설정 화면, 2: 투표 화면, 3: 투표 결과 화면
    const [candidates, setCandidates] = useState([]);
    const [voteStatus, setVoteStatus] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    
    /*
    useEffect(() => {
        axios
            .get(`http://localhost:8080/candidate?roomId=${roomId}`)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    setCandidates(res.data.candidates);
                } else {
                    console.log('에러 코드 :', res.data.statusCode);
                }
            })
            .catch((err) => {
                console.error("후보자 목록 불러오기 실패:", err);
            });
    }); */

    const voteSocketServiceRef = useRef(null);

    const handleSocketMessage = (rawData) => {
        const data = JSON.parse(rawData);

        if (data.type === "vote") {
            setVoteStatus(data.candidates);
            setTotalAmount(data.totalAmount);
        }
        
    };

    const onVoteStart = () => {
        voteSocketService.current = new VoteSocketService(
            roomId,
            handleSocketMessage
        );
    }

    const onVoted = () => {

    }

    const onVoteEnd = () => {
        voteSocketService.close();
    }

    // 투표 웹소켓 연결
    const [voteSocketService] = useState({});

    // 투표 웹소켓 연결, 추후 화면 전환 구현 시 VoteCandidateItemSet에서 초기화, 현재는 Voting.js에서 초기화


    useEffect(() => {
        axios
            .get(`http://localhost:8080/room/check-admin?roomId=${roomId}`, {
                withCredentials: true
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    if(res.data.isAdmin){
                        setProgress(1);
                    }else{
                        setProgress(0);
                    }
                } else {
                    console.log('에러 코드 :', res.data.statusCode, '메세지 : ', res.data.message);
                    setProgress(0);
                }
            })
            .catch((err) => {
                console.error("후보자 목록 불러오기 실패:", err);
            });
    }, []);

    const stepComponents = useMemo(() =>[
        () => <UserWaitingBoard/>,
        () => <CandidateEditItemSet candidates={candidates} roomId={roomId}/>,
        () => <VoteCandidateItemSet candidates={candidates} roomId={roomId} socketService={voteSocketService} />,
        () => <ResultCandidateItemSet candidates={candidates} voteStatus={voteStatus} />
    ], [progress, candidates, voteStatus]);


    const [isVoteResultModalOpen, setVoteResultModalOpen] = useState(false);
    const [voteResult, setVoteResult] = useState({});
    
    // 투표 종료 => 결과 팝업 출력
    const handleVoteEnd = () => {
        fetch(`${API_URL}/vote/result`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "roomId=" + roomId,
            credentials: 'include'
            })
            .then((res) => {
                if (!res.ok) { throw new Error('서버 오류');}
                return res.json();
            })
            .then((voteResult) => {
                
                //투표 결과 담기
                setVoteResult({
                    signNumber : voteResult.candidateId,
                    name : voteResult.name,
                    description : voteResult.description,
                    promise : voteResult.promise,
                    totVoteRate : voteResult.voteRate,
                    absRate : voteResult.absVoteRate,
                    totVoteCount : voteResult.totalEntryCount,
                    candidateVoteRate : voteResult.topCandidateVoteRate,
                });

                //투표 결과 팝업 출력
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
                            
                            <RoomHeader title={roomInfo.name} entryCode={roomInfo.entryCode} />

                            <div className="row">
                                
                                {stepComponents[progress]()}
                                
                                <Chat roomId={roomId} />
                            </div>
                            <button className="btn vote-end-btn" onClick={handleVoteEnd}>투표 종료</button>

                            <VoteStatusBoard totalAmount={totalAmount} />
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

export default Voting;