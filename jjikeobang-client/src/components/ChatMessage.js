function ChatMessage({message, time}) {
    return (
        <div className="chat-message">
            <p className="mb-1">{message}</p>
            <div className="chat-time">{time}</div>
        </div>
    );
}

export default ChatMessage;