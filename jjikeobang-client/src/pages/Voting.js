import React, { useRef, useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
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
import getVoteResult from "../service/VoteResultService";
import checkAdmin from '../service/CheckAdminService';
import {getCandidate} from '../service/CandidateService';

function Voting() {
    const location = useLocation();
    const roomInfo = location.state.roomInfo || {};
    const roomId = roomInfo.roomId;

    const [progress, setProgress] = useState(0); // 0: 대기 화면, 1: 후보자 설정 화면, 2: 투표 화면, 3: 투표 결과 화면
    const [candidates, setCandidates] = useState(location.state.candidateList);
    const [voteStatus, setVoteStatus] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [voteDuration, setVoteDuration] = useState(roomInfo.voteDuration * 60);

    console.log(`방 입장!!!! room = ${JSON.stringify(roomInfo)}, candidates=${JSON.stringify(candidates)}`)

    const handleSocketMessage = (rawData) => {
        const data = JSON.parse(rawData);
        
        if (data.type === "vote") {
            setVoteStatus(data.candidates);
            setTotalAmount(data.totalAmount);
        }
    };

    const onVoteStart = () => {
        getCandidate(roomId, setCandidates);

        voteSocketService.current = new VoteSocketService(
            roomId,
            handleSocketMessage
        );
        setProgress(2);
    }

    const onVoted = () => {
        setProgress(3);
    }

    const onVoteEnd = () => {
        voteSocketService.close();
        handleVoteEnd();
    }

    // 투표 웹소켓 연결
    const voteSocketService = useRef(null);;

    // 투표 웹소켓 연결, 추후 화면 전환 구현 시 VoteCandidateItemSet에서 초기화, 현재는 Voting.js에서 초기화


    useEffect(() => {
        checkAdmin({roomId}).then((isAdmin) => {
            if(isAdmin){
                setProgress(1);
            }else{
                setProgress(0);
            }
        })
    }, [roomId]);

    const stepComponents = useMemo(() =>[
        () => <UserWaitingBoard/>,
        () => <CandidateEditItemSet roomId={roomId} candidates={candidates} setCandidates={setCandidates} voteStart={onVoteStart}/>,
        () => <VoteCandidateItemSet candidates={candidates} roomId={roomId} voteService={voteSocketService.current} />,
        () => <ResultCandidateItemSet candidates={candidates} voteStatus={voteStatus} />
    ], [progress, candidates, voteStatus]);


    const [isVoteResultModalOpen, setVoteResultModalOpen] = useState(false);
    const [voteResult, setVoteResult] = useState({});
    
    // 투표 종료 => 결과 팝업 출력
    const handleVoteEnd = () => {
        getVoteResult(roomId).then((result) => {
            //투표 결과 담기
            setVoteResult(result);

            //투표 결과 팝업 출력
            setVoteResultModalOpen(true);
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
                                <div className="col-md-7 vote-wrapper" >
                                    {stepComponents[progress]()}
                                </div>
                                <div className="col-md-5">
                                    <Chat roomId={roomId} />
                                </div>
                            </div>
                            <button className="btn vote-end-btn" onClick={handleVoteEnd}>투표 종료</button>

                            <VoteStatusBoard totalAmount={totalAmount} voteDuration={voteDuration} />
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