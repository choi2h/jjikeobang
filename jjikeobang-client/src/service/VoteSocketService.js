class VoteSocketService {
    constructor(roomId, onMessageCallback) {
        this.websocket = new WebSocket(
            `ws://localhost:8080/vote/${roomId}`
        );
        console.log("투표 소켓 서비스 연결 성공");
        this.websocket.onmessage = (e) => onMessageCallback(e.data);
    }
    
    sendMessage(message) {

        console.log(`투표 실행 ${message}`);
        this.websocket.send(message);
    }

    close() {
        this.websocket.close();
    }
}
export default VoteSocketService;