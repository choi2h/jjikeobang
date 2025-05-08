const API_URL = process.env.REACT_APP_API_URL;

function checkAdmin({roomId}) {
    return fetch(`${API_URL}/room/check-admin?roomId=${roomId}`, {
                method: 'GET',
                credentials: 'include'
            })
            .then((res) => {
                if(!res.ok) {
                    console.log('에러 코드 :', res.data.statusCode, '메세지 : ', res.data.message);
                    return false;
                }

                return res.json();
            }).then((data) => {
                return data.isAdmin;
            })
            .catch((err) => {
                console.error("후보자 목록 불러오기 실패:", err);
            });
}

export default checkAdmin;