import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Profile from "../components/header/Profile";
import Logo from "../components/header/Logo";
import Button from "../components/common/Button";
import AddCandidateModal from "../components/modal/AddCandidateModal";
import CandidateItemSet from "../components/voteInfo/CandidateItemSet";

const API_URL = process.env.REACT_APP_API_URL;

function CreateRoom(){
    const navigate = useNavigate();
    const [roomName, setRoomName] = useState('');
    const [maxParticipant, setmaxParticipant] = useState(0);
    const [voteDuration, setvoteDuration] = useState(0);
    const [candidates, setCandidates] = useState([]);
    const [candidate, setCandidate] = useState(null);
    const location = useLocation();
    const user = location.state.user || {};
    const addCandidate = (candidate) => {
        setCandidates([...candidates, { ...candidate, id: Date.now() }]);
    };

    const editCandidate = (updatedCandidate) => {
        setCandidates(candidates.map(candidate =>
           candidate.id === updatedCandidate.id ? { ...updatedCandidate } : candidate
        ));
    };

    const deleteCandidate = (id) => {
        if (window.confirm('삭제하시겠습니까?')) {
            setCandidates(candidates.filter((c) => c.id !== id));
        }
    };

    const openModalForAdd = () => {
        setCandidate(null);
    };

    const openModalForEdit = (candidate) => {
        setCandidate(candidate);
    };

    //CreateRoom에서만 후보자 리스트를 정의함
    useEffect(() => {
        sessionStorage.removeItem('candidates');
      }, []);

    const handleCreateRoom = () => {
        if (!roomName.trim()) {
            alert("투표방 이름을 입력해주세요.");
            return;
        }
    
        if (!maxParticipant || maxParticipant < 1 || maxParticipant > 300) {
            alert("인원수는 1 ~ 300 사이의 수를 입력해 주세요.");
            return;
        }
    
        if (!voteDuration || voteDuration < 1) {
            alert("투표 시간은 1분 이상이어야 합니다.");
            return;
        }
    
        if (candidates.length === 0) {
            alert("최소 1명의 후보자를 등록해주세요.");
            return;
        }

        // 데이터 전송
        const requestData = {
            name: roomName,
            maxParticipant: maxParticipant,
            voteDuration: voteDuration,
        };

        fetch(`${API_URL}/room`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData),
            credentials: 'include'
            })
            .then((res) => {
                if (!res.ok) { throw new Error('서버 오류');}
                return res.json();
            })
            .then((roomInfo) => {
                // 전송 성공 시 투표 준비 관리자 화면 이동
                navigate('/votingReady',{
                    state : {
                        roomInfo : roomInfo, //방 정보 
                        candidateList : candidates, //후보자 정보
                    }
                });
            })
            .catch((err) => {
                console.error('에러 발생:', err);
                alert('방 생성 중 오류가 발생했습니다.');
            });
    };

    return (
        <>
             {/* 상단 프로필 영역 */}
             <nav className="navbar mb-4">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <Logo/>
                    <Profile user={user}/>
                </div>
            </nav>

            <div className="container-fluid main-container">
                {/* 방 만들기 컨테이너 */}
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="create-room-container">
                            <h2 className="create-room-title text-center">투표방 생성</h2>

                            <form>
                                {/* 투표방 이름 */}
                                <div className="mb-4">
                                    <label htmlFor="roomName" className="form-label">투표방 이름</label>
                                    <input type="text" value={roomName} onChange={(e)=>{setRoomName(e.target.value)}} className="form-control" id="roomName" placeholder="투표방 이름을 입력하세요" />
                                </div>

                                {/* 인원수 */}
                                <div className="mb-4">
                                    <label htmlFor="maxParticipant" className="form-label">인원수</label>
                                    <div className="input-group">
                                        <input type="number" value={maxParticipant} onChange={(e)=>{setmaxParticipant(Number(e.target.value))}} className="form-control" id="maxParticipant" placeholder="최대 300명" />
                                        <span className="input-group-text">명</span>
                                    </div>
                                </div>

                                {/* 투표 시간 */}
                                <div className="mb-4">
                                    <label className="form-label">투표 시간</label>
                                    <div className="input-group">
                                        <input type="number" value={voteDuration} onChange={(e)=>{setvoteDuration(Number(e.target.value))}} className="form-control" id="voteDuration" placeholder="30" />
                                        <span className="input-group-text">분</span>
                                    </div>
                                </div>

                                {/* 후보자 */}
                                <div className="mb-4">
                                    <label className="form-label">후보자</label>

                                    <div className="candidate-card-list">
                                        {
                                            candidates.map((candidate, index) => {
                                                return <CandidateItemSet key={candidate.id} candidate={candidate} openModalForEdit={openModalForEdit} deleteCandidate={deleteCandidate} modalId='#addCandidateModal'/>
                                            })
                                        }

                                        {/* 후보자 추가 버튼 */}
                                        <div className="add-candidate-btn" data-bs-toggle="modal" data-bs-target="#addCandidateModal" onClick={openModalForAdd}>
                                            <i className="bi bi-plus-lg"></i>
                                            <span>등록하기</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 방 생성하기 버튼 */}
                                <div className="text-center mt-5">
                                    <Button type='createRoom' text='방 생성하기' onClick={handleCreateRoom}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* 후보자 등록 모달 */}
            <AddCandidateModal 
                addCandidate={addCandidate}
                editCandidate={editCandidate}
                candidate={candidate}
            />
        </>
    );
}

export default CreateRoom;