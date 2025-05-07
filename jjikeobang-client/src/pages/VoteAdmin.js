import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RoomHeader from '../components/voteInfo/RoomHeader';
import Chat from '../components/chat/Chat';
import VoteStatusBoard from '../components/voteInfo/VoteStatusBoard';
import AddCandidateModal from '../components/modal/AddCandidateModal';
import VoteAdminWaiting from '../components/voteInfo/VoteAdminWaiting';
import CandidateItem from '../components/voteInfo/CandidateItem';
import VoteStartBtn from '../components/voteInfo/VoteStartBtn';
import VotingBtn from '../components/voteInfo/VotingBtn';
import PromiseModal from '../components/modal/PromiseModal';
import VoteResultModal from '../components/modal/VoteResultModal';

function VoteAdmin(){
    const location = useLocation();
    const { roomInfo, candidateList } = location.state || {};
    
    // 후보자 목록
    const [candidates, setCandidates] = useState(candidateList);
    // 후보자
    const [candidate, setCandidate] = useState(null);
    // 투표시작 여부
    const [isStart, setIsStart] = useState(false);
    // 후보자 선택
    const [selectedCandidateId, setSelectedCandidateId] = useState(null);
    // 전체 투표자 수
    const [totalVoteCount, setTotalVoteCount] = useState(0);
    // 현재 투표수 
    const [currentVoteCount, setCurrentVoteCount] = useState(0);
    // 투표 여부
    const [isVoting, setIsVoting] = useState(false);
    // 투표 종료 시간 (서버에서 계산된 시간)
    const [endTime, setEndTime] = useState(null);
    // 투표 종료 시간 (화면에 출력되는 시간 MM:ss)
    const [remainingTime, setRemainingTime] = useState(roomInfo.voteDuration + '분');
    // WebSocket
    const socket = useRef(null);  // WebSocket을 useRef로 유지
    // WebSocket 생성
    useEffect(() => {
        if (!socket.current) {
            socket.current = new WebSocket('ws://localhost:8080/chat/ws/' + roomInfo.roomId);
        }
    }, []);

    // 후보자 수정
    const editCandidate = (updatedCandidate) => {
        setCandidates(candidates.map(candidate =>
           candidate.candidateId === updatedCandidate.candidateId ? { ...updatedCandidate } : candidate
        ));
    };
    
    /* 투표 시작 버튼 이벤트 */
    const handleVoteStart = () => {
        //1. 후보자 DB 저장
        const candidateList = candidates.map((candidate, index) => ({
            ...candidate,
            signNumber: index + 1
        }));

        const requestData = {
                roomId : roomInfo.roomId,
                candidates: candidateList,
        };

        fetch('http://localhost:8080/candidate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData),
            credentials: 'include'
        })
        .then(async (res) => {
            if (!res.ok) {throw new Error('서버 오류');}
            return await res.json();
        })
        .then((data) => {
            //1. 후보자 정보 세팅
            setCandidates(data);

            //2. 참여자 : 소켓 => 클라이언트 투표 화면 전환
            const msgObj = {type : "VOTE_START"};
            socket.current.send(JSON.stringify(msgObj));

            //3. 관리자 : 후보자 설정 컴포넌트 => 후보자(투표/기권) 컴포넌트로 전환
            setIsStart(true);

            //4. 투표시작 공지 발송
            const noticeMsg = {type: 'CHAT',
                content: '투표가 시작되었습니다. 후보자를 선택 후, 투표해 주세요!',
                timestamp: new Date().toLocaleTimeString('ko-KR', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
            })};
            socket.current.send(JSON.stringify(noticeMsg));
        })
        .catch((err) => {
            console.error('에러 발생:', err);
            alert('후보자 저장 중 오류가 발생했습니다.');
        });
    };

    /* 투표하기 / 기권하기 */
    const handleVoting = (type) => {
        if(isVoting){
            alert('이미 투표 또는 기권을 완료하였습니다.');
            return;
        }

        let requestURL = '';
        
        if(type === 'VOTE'){
            // 투표URL
            requestURL = 'http://localhost:8080/vote';
        }else{
            // 기권URL
            requestURL = 'http://localhost:8080/vote/abstain';
        }

        fetch(requestURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: "roomId=" + roomInfo.roomId + "&candidateId=" + selectedCandidateId,
            credentials: 'include'
        })
        .then((res) => {
            if (!res.ok) {throw new Error('서버 오류');}
            return res.json();
        })
        .then((data) => {
            // 투표 완료 처리
            setIsVoting(true);

            // 총 투표 수 증가 meessage 송신
            let isEnd = data.isEnd;
            const msgObj = {type : "VOTE_COUNT", voteCount : data.voteCount};
            socket.current.send(JSON.stringify(msgObj));

            // 투표 종료 message 송신
            if(isEnd){
                alert('투표 종료');
            }
        })
        .catch((err) => {
            console.error('에러 발생:', err);
            alert('후보자 저장 중 오류가 발생했습니다.');
        });
    };

    /* 남은 투표 시간 */
    useEffect(() => {
        if (!endTime) return;

        const interval = setInterval(() => {
            const now = new Date();
            const remaining = endTime - now;

            if (remaining <= 0) {
                clearInterval(interval);
                setRemainingTime('00:00');
                // 투표 종료 처리
            } else {
                const minutes = Math.floor((remaining / 1000 / 60) % 60);
                const seconds = Math.floor((remaining / 1000) % 60);
                setRemainingTime(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [endTime]);

    return (
        <>
            <div className="container-fluid main-container">
                {/* 투표 컨테이너 */}
                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        <div className="waiting-container">
                            {/* 방 헤더 */}
                            <RoomHeader title={roomInfo.name} entryCode={roomInfo.entryCode}/>

                            {/* 메인 콘텐츠 */}
                            <div className="row">
                                {/* 왼쪽 영역 (후보자 목록) */}
                                <div className="col-md-7 vote-wrapper">
                                    <div className="candidate-list">
                                        { 
                                            isStart === false ? <VoteAdminWaiting candidates={candidates} setCandidates={setCandidates} setCandidate={setCandidate}/>
                                                                 : <CandidateItem candidates={candidates} setCandidate={setCandidate} selectedCandidateId={selectedCandidateId} setSelectedCandidateId={setSelectedCandidateId}/>
                                        }
                                    </div>

                                    {/* 투표 시작 버튼 */}
                                    {
                                        isStart === false ? <VoteStartBtn handleVoteStart={handleVoteStart}/> : <></>
                                    }
                                    {/* 투표/기권 버튼*/}
                                    {
                                        isStart === true ? <VotingBtn handleVoting={handleVoting} selectedCandidateId={selectedCandidateId} candidates={candidates}/> : <></>
                                    }
                                </div>

                                {/* 오른쪽 영역 (채팅) */}
                                <div className="col-md-5">
                                    <div className="chat-wrapper">
                                        <Chat socket={socket} roomId={roomInfo.roomId} setTotalVoteCount={setTotalVoteCount} setEndTime={setEndTime} setCurrentVoteCount={setCurrentVoteCount}/>
                                    </div>
                                </div>
                            </div>
                            {/* 투표 현황 */}
                            <div className="row mt-4">
                                <VoteStatusBoard label='총 투표수' content={`${currentVoteCount}표 / ${totalVoteCount}표`} color='#1a4b8c ' />
                                <VoteStatusBoard label='남은 시간' content={remainingTime}color='#f59e0b ' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 후보자 등록 모달 */}
            <AddCandidateModal
                addCandidate={null}
                editCandidate={editCandidate}
                candidate={candidate}
            />
            
            {/* 후보자 공약 모달 */}
            <PromiseModal candidate={candidate}/>

            {/* 투표 결과 모달 */}
            <VoteResultModal />
        </>
    );
}

export default VoteAdmin;