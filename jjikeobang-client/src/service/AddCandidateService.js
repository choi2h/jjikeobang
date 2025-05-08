const API_URL = process.env.REACT_APP_API_URL;

function addCandidate({mappedCandidatesInfo}) {
    fetch(`${API_URL}/candidates`, {
        method: 'POST',
        body: JSON.stringify({
            mappedCandidatesInfo
        }),
        credentials: 'include'
    })
    .then((res) => {
        if (res.status === 200) {
            window.sessionStorage.removeItem('candidates');
        } else {
            window.alert('에러 코드 : ', res.status, '에러 메세지 : ', res.data);
        }
    })
    .catch((err) => {
        window.alert('후보자 DB 등록에 실패했습니다.', err);
    });
}

export default addCandidate;