const API_URL = process.env.REACT_APP_API_URL;

function getVoteResult({roomId}) {
    if (!roomId) {
        return Promise.reject(new Error('roomId가 전달되지 않았습니다.'));
    }
    
    return fetch(`${API_URL}/vote/result`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ roomId }),
            credentials: 'include'
        })
        .then((res) => {
            if (!res.ok) { throw new Error('서버 오류');}
            return res.json();
        })
        .then((voteResult) => {
            return {
                signNumber : voteResult.candidateId,
                name : voteResult.name,
                description : voteResult.description,
                promise : voteResult.promise,
                totVoteRate : voteResult.voteRate,
                absRate : voteResult.absVoteRate,
                totVoteCount : voteResult.totalEntryCount,
                candidateVoteRate : voteResult.topCandidateVoteRate,
            };
        })
        .catch((err) => {
            console.error('에러 발생:', err);
            alert('투표 결과 조회 중 오류가 발생하였습니다.');
        });
}

export default getVoteResult;