class VoteSocketService {
    constructor(roomId, onMessageCallback) {
        this.websocket = new WebSocket(
            `ws://localhost:8080/vote/${roomId}`
        );

        this.websocket.onmessage = (e) => onMessageCallback(e.data);

    }
    
    sendMessage(message) {
        const sendData = {
            type: "message",
            text: message,
            dateTime: new Date().toISOString(),
        };

        console.log(`투표 실행 ${JSON.stringify(sendData)}`);
        this.websocket.send(JSON.stringify(sendData));
    }

    close() {
        this.websocket.close();
    }
}
export default VoteSocketService;