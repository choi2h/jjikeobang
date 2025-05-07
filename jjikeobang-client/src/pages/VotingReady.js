import React, { useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


function VotingReady(){
    const location = useLocation();
    const room = location.state.roomInfo || {}; //room 정보는 투표방 세션이 유지될동안 필요함

    //후보자 정보 렌더링
    const [candidateList,setCandidateList] = useState(()=>{
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
    })
                                                

    //후보자 수정 
    const [candidateIndex, setCandidateIndex] = useState(null);
    const [editData, setEditData] = useState({
        name: '',
        description: '',
        promise: ''
      });

    const handleModify = ()=>{
        if(!editData.name || !editData.description || !editData.promise){
            window.alert('값이 비었습니다')
            return;
        }

        const newCandidateList = [...candidateList];
        newCandidateList[candidateIndex]={
            ...newCandidateList[candidateIndex],
            name : editData.name,
            description : editData.description,
            promise : editData.promise
            }
        setCandidateList(newCandidateList);
        window.sessionStorage.setItem('candidates',JSON.stringify(newCandidateList));
        window.alert('수정되었습니다');
    }

    //후보자 삭제 
    const handleDelete = (index)=>{
        if(candidateList.length===1){
            window.alert('후보자는 최소 1명 이상 존재해야 합니다.');
            return;
        }

        const confirm = window.confirm('삭제하시겠습니까?');
        if(confirm){
            const deletedCandidateList = [...candidateList];
            deletedCandidateList.splice(index,1);
            setCandidateList(deletedCandidateList);
            window.sessionStorage.setItem('candidates',JSON.stringify(deletedCandidateList));
            window.alert('삭제 되었습니다.');
        }else{
            return
        }
    }

    
    const [selectedIndex, setSelectedIndex] = useState(null);
    // 후보자 클릭 (선택 시 selected 클래스 추가)
    const selectCandidate = (index) => {
      setSelectedIndex(index); // 클릭한 후보자의 index 번호 저장
    };


    // 후보자 정보 DB 저장 -> voting 페이지 이동
    const navigate = useNavigate();
    const handleVoting = () =>{
        const candidatesInfo = window.sessionStorage.getItem('candidates');
        const parsedCandidatesInfo = JSON.parse(candidatesInfo);
        const mappedCandidatesInfo = parsedCandidatesInfo.map(({id,...rest}, index) => ({
            ...rest, 
            signNumber: index + 1,
            roomId: room.roomId
          }));
        
          
        axios 
          .post('http://localhost:8080/candidates', mappedCandidatesInfo)
          .then((res)=>{
            if(res.data.statusCode===200){
                window.sessionStorage.removeItem('candidates');
                navigate('/voting',{
                    state : {room}
                })
            }else{
                window.alert('에러 코드 : ',res.data.statusCode, '에러 메세지 : ',res.data.data);
            }
          })
          .catch((err)=>{
            window.alert('후보자 DB 등록에 실패했습니다.',err);
          })

    };

    return (
        <>
            <div className="container-fluid main-container">
                {/* 투표 컨테이너 */}
                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        <div className="waiting-container">
                            {/* 방 헤더 */}
                            <div className="room-header">
                                <div>
                                    <h2 className="room-title">{room.name}</h2>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="room-code-label">입장 코드:</span>
                                    <span className="room-code">{room.entryCode}</span>
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

                                        {/* 후보자 정보 & 모달 출력 */}
                                        {
                                            candidateList.map((candidate,index)=>{
                                                const modalId = `pledgeModal-${candidate.candidateId}`;
                                                return(
                                                <div key={candidate.candidateId}>
                                                    <div
                                                        className={`candidate-item ${selectedIndex === index ? 'selected' : ''}`}
                                                        onClick={() => selectCandidate(index)}
                                                    >
                                                        <div className="candidate-number">{index+1}번</div>
                                                        <div className="candidate-info">
                                                            <div className="candidate-name">{candidate.name}</div>
                                                            <div className="candidate-description">{candidate.description}</div>
                                                        </div>
                                                        <button className="view-modify-btn" 
                                                                data-bs-toggle="modal"
                                                                data-bs-target={`#${modalId}`}
                                                                onClick={()=>{
                                                                    setCandidateIndex(index);
                                                                    setEditData({
                                                                        name : candidate.name,
                                                                        description : candidate.description,
                                                                        promise : candidate.promise
                                                                    })
                                                                }}>
                                                            수정
                                                        </button>
                                                        <button 
                                                            className="view-delete-btn"
                                                            onClick={()=>{
                                                                setSelectedIndex(index);
                                                                setTimeout(()=>handleDelete(index),0);
                                                            }}>
                                                            삭제
                                                        </button>
                                                    </div>

                                                    {/* 공약 수정 모달*/}
                                                    <div className="modal fade" id={modalId} tabindex="-1" aria-labelledby={`${modalId}-label`} aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h5 className="modal-title" id={`${modalId}-label`}>후보자 수정</h5>
                                                                    <button type="button" 
                                                                            className="btn-close" 
                                                                            data-bs-dismiss="modal" 
                                                                            aria-label="Close"
                                                                            onClick={()=>{
                                                                                //수정하지 않았다면, value 초기화
                                                                                setEditData({
                                                                                    name:candidateList[candidateIndex].name,
                                                                                    description:candidateList[candidateIndex].description,
                                                                                    promise:candidateList[candidateIndex].promise,
                                                                                });
                                                                            }}></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <form>
                                                                        {/* 후보자명 */}
                                                                        <div className="mb-3">
                                                                            <label for="candidateName" className="form-label">후보자명</label>
                                                                            <input type="text"
                                                                                   className="form-control"
                                                                                   id="candidateName"
                                                                                   value={editData.name}
                                                                                   onChange={(e)=>{
                                                                                    setEditData({
                                                                                        ...editData,
                                                                                        name:e.target.value
                                                                                    })
                                                                                   }} />
                                                                        </div>

                                                                        {/* 후보자 한줄 소개 */}
                                                                        <div className="mb-3">
                                                                            <label for="candidateDescription" className="form-label">후보자 한줄 소개</label>
                                                                            <input type="text"
                                                                                   className="form-control"
                                                                                   id="candidateDescription"
                                                                                   value={editData.description}
                                                                                   onChange={(e)=>{
                                                                                    setEditData({
                                                                                        ...editData,
                                                                                        description : e.target.value
                                                                                    })
                                                                                   }} />
                                                                        </div>

                                                                        {/* 후보 공약 */}
                                                                        <div className="mb-3">
                                                                            <label for="candidatePledge" className="form-label">후보 공약</label>
                                                                            <textarea className="form-control" 
                                                                                      id="candidatePledge" 
                                                                                      rows="5"
                                                                                      value={editData.promise}
                                                                                      onChange={(e)=>{
                                                                                        setEditData({
                                                                                            ...editData,
                                                                                            promise : e.target.value
                                                                                        })
                                                                                      }}></textarea>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" 
                                                                            className="btn btn-primary"
                                                                            data-bs-dismiss="modal"
                                                                            onClick={()=>{
                                                                                handleModify()
                                                                                }}>수정하기</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                )
                                            })
                                        }

                                    </div>

                                    {/* 투표 버튼 */}
                                    <div className="d-flex justify-content-center">
                                        <div className="col-md-5 mb-3">
                                            <button className="btn vote-btn" onClick={handleVoting}>투표 시작</button>
                                        </div>
                                    </div>
                                </div>

                                {/* 오른쪽 영역 (채팅) */}
                                <div className="col-md-5">
                                    <div className="chat-wrapper">
                                        <div className="chat-container">
                                            <div className="chat-message">
                                                <p className="mb-1">잠시만 기다려주세요. 곧 투표가 시작됩니다.</p>
                                                <div className="chat-time">08:55:45</div>
                                            </div>
                                            <div className="chat-message">
                                                <p className="mb-1">투표 시작 전까지 자유롭게 대화해주세요!</p>
                                                <div className="chat-time">08:57:15</div>
                                            </div>
                                        </div>
                                        <div className="chat-input-container">
                                            <input type="text" className="chat-input" placeholder="메시지를 입력하세요..." />
                                            <button className="chat-send-btn">
                                                <i className="bi bi-send"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 투표 현황 */}
                            <div className="row mt-4">
                                <div className="col-md-6 mb-3">
                                    <div className="vote-status">
                                        <div className="vote-count-label">총 투표수</div>
                                        <div className="vote-count">0표</div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="vote-status">
                                        <div className="vote-time-label">남은 시간</div>
                                        <div className="vote-time">15분 0초</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* 부트스트랩 JS */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        </>
    );
}

export default VotingReady;