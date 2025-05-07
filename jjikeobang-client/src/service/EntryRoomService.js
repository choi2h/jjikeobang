import { HttpStatusCode } from "axios";

function enterRoom(entryCode) {
    return fetch(`http://localhost:8080/room/enter?entryCode=${entryCode}`, {
        method: 'GET',
        credentials: 'include'
    })
    .then((res) => {
        if(res.status === HttpStatusCode.BadRequest) {
            alert('존재하지 않는 입장 코드입니다.');
        } else if(!res.ok) {
            throw new Error('서버 오류');
        }

        return res.json();
    }).then((data) => {
        console.log(`방 정보를 가져왔습니다. data=${JSON.stringify(data)}`);
        return data;
    }).catch((err) => {
        console.log('에러 발생:', err);
        alert('방에 입장할 수 없습니다.');
    });
}

export default enterRoom;