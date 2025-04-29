import ChatMessage from "./ChatMessage";

function Chat() {
    return (
        <div>
            <div className="chat-container">
                <ChatMessage message={"잠시만 기다려주세요. 곧 투표가 시작됩니다."} time={"08:55:45"}/>
                <ChatMessage message={"투표 시작 전까지 자유롭게 대화해주세요!"} time={"08:57:15"}/>
            </div>
            <div className="chat-input-container">
                <input type="text" className="chat-input" placeholder="메시지를 입력하세요..." />
                <button className="chat-send-btn">
                    <i className="bi bi-send"></i>
                </button>
            </div>
        </div>
    );

    
}

export default Chat;