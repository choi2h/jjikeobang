function getVoteHistories() {
    return fetch(`http://localhost:8080/vote/history`, {
        method: 'GET'
    })
    .then((res) => {
        console.log(res);
        if(!res.ok) {
            throw new Error('서버 오류');
        }

        return res.json();
    }).then((data) => {
        console.log(`히스토리 정보를 가져왔습니다. histories=${JSON.stringify(data.data)}`);
        return data.data;
    }).catch((err) => {
        console.log('투표 참여 기록을 확인할 수 없습니다.', err);
    })
}

export default getVoteHistories;