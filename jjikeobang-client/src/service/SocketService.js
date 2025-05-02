class SocketService {
    constructor(roomId) {
        this.roomId = roomId;
        this.websocket = new WebSocket(`ws://localhost:8080/chat/${roomId}`);
        this.websocket.onmessage = (e) => console.log("👉 응답:", e.data);
        this.websocket.onopen = () => this.websocket.send("Hello!");

        console.log('완료!')
    }

    sendMessage(name, message) {

    }

    close() {
        this.websocket.close();
    }
}

export default SocketService;