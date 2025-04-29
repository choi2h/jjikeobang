import React from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../components/header/Profile";
import Logo from "../components/header/Logo";
import Button from "../components/common/Button";
import AddCandidateModal from "../components/modal/AddCandidateModel";
import CandidateItemSet from "../components/voteInfo/CandidateItemSet";

const candidates = [
    {
        id: 1,
        name: '김민준',
        description: '2학년 7반',
        promise: "더 나은 학급을 만들겠습니다 \n" +
        "학급 소통 강화 \n" +
        "공정한 의견 수렴 \n" + 
        "투명한 학급비 운영 \n" +
        "즐거운 학급 분위기 조성",
    },
    {
        id: 2,
        name: '이서연',
        description: '2학년 12반',
        promise: "모두가 행복한 교실을 만들겠습니다 \n" +
        "학급 친목 활동 강화 \n" +
        "학습 환경 개선 \n" + 
        "학급 행사 다양화 \n" +
        "소외되는 학생 없는 학급 문화 조성",
    },
]

function CreateRoom(){
    const navigate = useNavigate();

    const handleCreateRoom = () => {
        navigate("/votingReady");
    }

    return (
        <>
             {/* 상단 프로필 영역 */}
             <nav className="navbar mb-4">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <Logo/>
                <Profile/>
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
                                    <label for="roomName" className="form-label">투표방 이름</label>
                                    <input type="text" className="form-control" id="roomName" placeholder="투표방 이름을 입력하세요" />
                                </div>

                                {/* 인원수 */}
                                <div className="mb-4">
                                    <label for="maxParticipants" className="form-label">인원수</label>
                                    <div className="input-group">
                                        <input type="number" className="form-control" id="maxParticipants" placeholder="최대 300명" />
                                        <span className="input-group-text">명</span>
                                    </div>
                                </div>

                                {/* 투표 시간 */}
                                <div className="mb-4">
                                    <label className="form-label">투표 시간</label>
                                    <div className="input-group">
                                        <input type="number" className="form-control" id="voteMinutes" placeholder="30" />
                                        <span className="input-group-text">분</span>
                                    </div>
                                </div>

                                {/* 후보자 */}
                                <div className="mb-4">
                                    <label className="form-label">후보자</label>

                                    <div className="candidate-card-list">
                                        {
                                            candidates.map((candidate, index) => {
                                                return <CandidateItemSet key={index} candidate={candidate}/>
                                            })
                                        }

                                        {/* 후보자 추가 버튼 */}
                                        <div className="add-candidate-btn" data-bs-toggle="modal" data-bs-target="#addCandidateModal">
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
            <AddCandidateModal addCandidate={()=>{console.log('등록하기 버튼 클릭')}}/>
        </>
    );
}

export default CreateRoom;