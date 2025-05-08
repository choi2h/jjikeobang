import React, { useRef , useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import VoteResultModal from "../components/modal/VoteResultModal";
import VoteStatusBoard from "../components/voteInfo/VoteStatusBoard";
import Chat from "../components/chat/Chat";

const API_URL = process.env.REACT_APP_API_URL;

function Voting(){
    const location = useLocation();
    const roomInfo = location.state.room || {};
    const roomId = roomInfo.roomId;

    const [candidates, setCandidates] = useState([]);

    useEffect(()=>{
        axios
            .get(`http://localhost:8080/candidate?roomId=${roomId}`)
            .then((res)=>{
                if(res.data.statusCode===200){
                    setCandidates(res.data.candidates);
                }else{
                    console.log('에러 코드 :',res.data.statusCode);
                }
   
            })
            .catch((err)=>{
                console.error("후보자 목록 불러오기 실패:", err);
            });
    },[]);

    // 선택된 후보자의의 index 저장
    const [selectedIndex, setSelectedIndex] = useState(null);
        
    // 후보자 클릭 (선택 시 selected 클래스 추가)
    const selectCandidate = (index) => {
          setSelectedIndex(index); // 클릭한 후보자의 index 번호 저장
    };

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
                    signNumber : voteResult.signNumber,
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

    return(
        <>
        <div className="container-fluid main-container">
            {/* 투표 컨테이너 */}
            <div className="row justify-content-center">
                <div className="col-lg-9">
                    <div className="waiting-container">
                        {/* 방 헤더 */}
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

                        {/* 메인 콘텐츠 */}

                        <div className="row">
                            {/* 왼쪽 영역 (후보자 목록) */}
                            <div className="col-md-7 vote-wrapper">
                                <div className="candidate-list">
                                    {/* 후보자 목록 출력 */}

                                    {
                                        candidates.map((candidate,index)=>{
                                            const modalId = `pledgeModal-${candidate.candidateId}`;
                                            const modalLabelId = `pledgeModalLabel-${candidate.candidateId}`;
                                            
                                            return(
                                                <>
                                                <div 
                                                  className={`candidate-item ${selectedIndex === index ? 'selected' : ''}`}
                                                  onClick={() => selectCandidate(index)}>
                                                    <div className="candidate-number">{index+1}번</div>
                                                    <div className="candidate-info">
                                                        <div className="candidate-name">{candidate.name}</div>
                                                        <div className="candidate-description">{candidate.description}</div>
                                                </div>
                                                <button className="view-pledge-btn" data-bs-toggle="modal"
                                                     data-bs-target={`#${modalId}`}>
                                                    공약보기
                                                </button>
                                                </div>


                                                {/* 공약 모달 */}
                                                <div className="modal fade"  id={modalId} tabindex="-1" aria-labelledby={modalLabelId} aria-hidden="true">
                                                    <div className="modal-dialog modal-dialog-centered">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="pledgeModalLabel1">{candidate.name}</h5>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <h6>{candidate.description}</h6>
                                                                <h6 className="mt-3">후보 공약</h6>
                                                                <div className="pledge-content">
                                                                    {candidate.promise}
                                                                </div>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </>
                                            )
                                        })
                                    }

                                </div>

                                {/* 투표 버튼 */}
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <button className="btn vote-btn">투표하기</button>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <button className="btn cancel-btn">기권</button>
                                    </div>
                                </div>
                            </div>

                            {/* 오른쪽 영역 (채팅) */}
                            <div className="col-md-5">
                                <Chat/>
                            </div>
                        </div>

                        {/* 투표 현황 */}
                        <div className="row mt-4">

                        {/* 테스트용 버튼 */}
                        <button onClick={handleVoteEnd}>투표종료</button>
                            <VoteStatusBoard label='총 득표수' content='12표' color='#1a4b8c '/>
                            <VoteStatusBoard label='남은 시간' content='14분 47초' color='#f59e0b '/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 투표 결과 모달 */}
        {   
            isVoteResultModalOpen ? <VoteResultModal voteResult={voteResult} voteResultModalClose={() => setVoteResultModalOpen(false)}/> : <></>
        }
        </>
    );
}

export default Voting;