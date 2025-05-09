import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function voteInit(roomId){
    axios.get(`${API_URL}/vote-start?roomId=${roomId}`, {
        withCredentials: true
    })
    .then((res) => {
        if (res.status === 200) {
            
        } else {
            console.log("투표 초기화 실패 : ", res.status);
        }
    })
    .catch((error) => {
        console.error("투표 시작 중 오류 발생 : ", error);
    });
};

export default voteInit;