function ChatMessage({messageInfo}) {
    if(messageInfo.type === "NOTICE") {
        return (
            <div className="notify-message">
                <p>{messageInfo.text}</p>
                <div className="chat-time">{messageInfo.datetime}</div>
            </div>
        );
    } else if(messageInfo.type === "MESSAGE") {
        return (
            <div className="chat-message">
                <p style={{fontWeight:'bold'}}>{messageInfo.name}</p>
                <p>{messageInfo.text}</p>
                <div className="chat-time">{messageInfo.datetime}</div>
            </div>
        );
    }
        
    return null;
}

export default ChatMessage;