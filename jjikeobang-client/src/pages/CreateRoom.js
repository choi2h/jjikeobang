import React from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile";
import Logo from "../components/Logo";


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
                                        {/* 후보자 1 */}
                                        <div className="candidate-card">
                                            <div className="candidate-info">
                                                <p style={{ fontWeight: 'bold' }}>후보자명: 홍길동</p>
                                                <div className="candidate-description">
                                                    <p style={{ fontWeight: 500, marginTop: '5px' }}>후보 공약</p>
                                                    <div className="candidate-promise">
                                                        1. 깨끗한 반을 만들겠습니다.<br/>
                                                        2. 웹버거를 쏘겠습니다.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <button type="button" className="candidate-modify-btn">수정</button>
                                                <button type="button" className="candidate-delete-btn">삭제</button>
                                            </div>
                                        </div>
                                        {/* 후보자 2 */}
                                        <div className="candidate-card">
                                            <div className="candidate-info">
                                                <p style={{ fontWeight: 'bold' }}>후보자명: 홍길동</p>
                                                <div className="candidate-description">
                                                    <p style={{ fontWeight: 500, marginTop: '5px' }}>후보 공약</p>
                                                    <div className="candidate-promise">
                                                        1. 깨끗한 반을 만들겠습니다.<br/>
                                                        2. 웹버거를 쏘겠습니다. <br/>
                                                        2. 웹버거를 쏘겠습니다. <br/>
                                                        2. 웹버거를 쏘겠습니다. <br/>
                                                        2. 웹버거를 쏘겠습니다. <br/>
                                                        2. 웹버거를 쏘겠습니다. <br/>
                                                        2. 웹버거를 쏘겠습니다. <br/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <button type="button" className="candidate-modify-btn">수정</button>
                                                <button type="button" className="candidate-delete-btn">삭제</button>
                                            </div>
                                        </div>


                                        {/* 후보자 추가 버튼 */}
                                        <div className="add-candidate-btn" data-bs-toggle="modal"
                                            data-bs-target="#addCandidateModal">
                                            <i className="bi bi-plus-lg"></i>
                                            <span>등록하기</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 방 생성하기 버튼 */}
                                <div className="text-center mt-5">
                                    <button type="button" className="btn create-room-btn" onClick={handleCreateRoom}>방 생성하기</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* 후보자 등록 모달 */}
            <div className="modal fade" id="addCandidateModal" tabindex="-1" aria-labelledby="addCandidateModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addCandidateModalLabel">후보자 등록</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                {/* 후보자명 */}
                                <div className="mb-3">
                                    <label for="candidateName" className="form-label">후보자명</label>
                                    <input type="text" className="form-control" id="candidateName" placeholder="후보자명을 입력하세요" />
                                </div>

                                {/* 후보자 한줄 소개 */}
                                <div className="mb-3">
                                    <label for="candidateDescription" className="form-label">후보자 한줄 소개</label>
                                    <input type="text" className="form-control" id="candidateDescription"
                                        placeholder="후보자 설명을 입력하세요" />
                                </div>

                                {/* 후보 공약 */}
                                <div className="mb-3">
                                    <label for="candidatePledge" className="form-label">후보 공약</label>
                                    <textarea className="form-control" id="candidatePledge" rows="5"
                                        placeholder="후보 공약을 입력하세요"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">등록하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateRoom;