// Voting.jsx
import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Chat from "../components/chat/Chat";
import VoteStatusBoard from "../components/voteInfo/VoteStatusBoard";
import VoteResultModal from "../components/voteInfo/VoteResultModal";
import VoteSocketService from "../components/voteInfo/VoteSocketService";
import UserWaitingBoard from "../components/voteInfo/UserWaitingBoard";
import VoteCandidateItemSet from "../components/voteInfo/VoteCandidateItemSet";
import ResultCandidateItemSet from "../components/voteInfo/ResultCandidateItemSet";

function Voting() {
    const location = useLocation();
    const roomInfo = location.state.room || {};
    const roomId = roomInfo.roomId;

    const [candidates, setCandidates] = useState([]);
    const [voteStatus, setVoteStatus] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);


    const socketServiceRef = useRef(null);
    const modalRef = useRef(null);

    // 투표 웹소켓 연결
    const [voteSocketService] = useState(() =>
        new VoteSocketService(roomId, handleSocketMessage)
    );

    // 모달 결과 정보
    const [winnerInfo, setWinnerInfo] = useState({});
    const [voteStats, setVoteStats] = useState({});


    // 테스트용 데이터
    setTotalAmount(0);
    // 테스트용 데이터 끝

    // 투표 웹소켓 연결, 추후 화면 전환 구현 시 VoteCandidateItemSet에서 초기화, 현재는 Voting.js에서 초기화
    useEffect(() => {
        socketServiceRef.current = new VoteSocketService(
            roomId,
            handleSocketMessage
        );

        return () => {
            socketServiceRef.current?.close();
        };
    });

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
    }, [candidates, roomId]);

    const handleSocketMessage = (rawData) => {
        const data = JSON.parse(rawData);

        if (data.type === "vote") {
            // 실시간 투표 현황 갱신
            setVoteStatus(data.candidates);
            setTotalAmount(data.totalAmount);
        }

        // 다른 type 처리 가능
    };

    const handleShowResultModal = () => {
        // 테스트용 데이터
        setWinnerInfo({
            number: 1,
            name: "김민준",
            class: "2학년 7반",
            description: "더 나은 학급을 만들겠습니다.",
            rate: 42
        });

        setVoteStats({
            total: "100표",
            rate: 96,
            abstained: 4
        })

        modalRef.current?.open();
    };

    return (
        <>
            <div className="container-fluid main-container">
                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        <div className="waiting-container">
                            <div className="room-header">
                                <div>
                                    <h2 className="room-title">2학년 3반 반장 선거</h2>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="room-code-label">입장 코드:</span>
                                    <span className="room-code">XK42P9</span>
                                    <button className="copy-btn ms-2">
                                        <i className="bi bi-clipboard"></i> 복사
                                    </button>
                                </div>
                            </div>
                            {/* 투표 대기 화면 / 관리자 설정 화면 -> 투표 화면 -> 투표 집계 화면 -> 모달 띄우기 */}
                            <div className="row">
                                {/* 화면 전환 구현 중*/}
                                <UserWaitingBoard/>
                                <VoteCandidateItemSet candidates={candidates} roomId={roomId} socketService={voteSocketService} />
                                <ResultCandidateItemSet candidates={candidates} voteStatus={voteStatus} />
                                {/* 채팅방 */}
                                <Chat roomId={roomId} />
                            </div>

                            <VoteStatusBoard totalAmount={totalAmount} />

                            <button className="view-pledge-btn" onClick={handleShowResultModal}>
                                투표종료
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <VoteResultModal
                ref={modalRef}
                winner={winnerInfo}
                stats={voteStats}
            />
        </>
    );
}

export default Voting;
