import React from 'react';

function VoteUserWaiting(){
    return (
        <>
            {/* 왼쪽 영역 (투표 정보) */}
            <div class="col-md-7 mb-4">
                <div class="d-flex justify-content-center align-items-center h-100">
                    <div class="text-center">
                        <h3 class="mb-4">투표 준비중...</h3>
                        <p class="text-muted">관리자가 투표를 시작하면 자동으로 투표 화면으로 이동합니다.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VoteUserWaiting;