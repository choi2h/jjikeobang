class SocketService {
    constructor(roomId) {
        this.roomId = roomId;
        this.websocket = new WebSocket(`ws://localhost:8080/chat/${roomId}`);
        this.websocket.onmessage = (e) => console.log("👉 응답:", e.data);

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