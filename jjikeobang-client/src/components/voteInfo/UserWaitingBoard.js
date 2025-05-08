import React from 'react';

const UserWaitingBoard = () => {
    return (
        <div className="col-md-7 vote-wrapper" >
            <div className="candidate-list">
                {/* 후보자 */}
                <div className="candidate-list d-flex justify-content-center align-items-center" style={{ height: '300px', fontSize: '1.5rem' }}>
                    투표 준비중입니다..
                </div>
            </div>
        </div >
    );
}

export default UserWaitingBoard;