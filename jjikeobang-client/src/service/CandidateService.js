import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function addCandidate(mappedCandidatesInfo) {
    console.log(`Add candidate ${JSON.stringify(mappedCandidatesInfo)}`);
    return axios.post(`${API_URL}/candidates`, mappedCandidatesInfo)
    .then((res)=>{
        if(res.data.statusCode===200){
            window.sessionStorage.removeItem('candidates');
        }else{
            window.alert('에러 코드 : ',res.data.statusCode, '에러 메세지 : ',res.data.data);
        }

        return res;
    })
    .catch((err)=>{
        window.alert('후보자 DB 등록에 실패했습니다.',err);
    });
}

function getCandidate(roomId, setCandidates) {
    axios
        .get(`${API_URL}/candidate?roomId=${roomId}`)
        .then((res) => {
            console.log('@@@@@@@@@' + JSON.stringify(res));
            if (res.data.statusCode === 200) {
                console.log('@@@@@@@@@@' + JSON.stringify(res.data));
                setCandidates(res.data.candidates);
            } else {
                console.log('에러 코드 :', res.data.statusCode);
            }
        })
        .catch((err) => {
            console.error("후보자 목록 불러오기 실패:", err);
        });
}

export {addCandidate, getCandidate};