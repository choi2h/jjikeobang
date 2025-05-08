class SocketService {
    constructor(roomId, onMessageCallback, username) {
        this.websocket = new WebSocket(`ws://localhost:8080/chat/${roomId}?usernam=${username}`);
        // this.websocket.addEventListener("open", () => {
        //     this.sendMessage(username, `${username}님이 입장했습니다.`);
        // })

        this.websocket.onmessage = (e) => onMessageCallback(e.data);
        
        console.log('완료!')
    }

    sendMessage(name, message) {
        const sendData = {
            type: 'message',
            name,
            text: message,
            dateTime: new Date().toISOString()
        };

        console.log(`send message!! ${JSON.stringify(sendData)}`)
        this.websocket.send(JSON.stringify(sendData));
    }

    close() {
        this.websocket.close();
    }
}

export default SocketService;