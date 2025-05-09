import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import SocketService from "../../service/SocketService";

function Chat({roomId, username, onVoteStart}) {
    const [chats, setChats] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const scrollRef = useRef();
    const socket = useRef(null);

    const onMessageCallback = (message) => {
        console.log("채팅 메시지 받았어!!!!" + message);
        const res = JSON.parse(message);
        if(res.type === 'VOTE_START') {
            console.log('투표를 시작한다!!!!');
            res.type = 'NOTICE';
            onVoteStart();
        }

        setChats(prevChats => [...prevChats, res]);
    }

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chats]);

    useEffect(() => {
        if(!socket.current) {
            const socketService = new SocketService(roomId, onMessageCallback, username);
            socket.current = socketService;
        }

        // return () => {
        //     if(socket.current) {
        //         socket.current.close();
        //         socket.current = null;
        //     }
        // }
    });

    const onClickSendButton = () => {
        console.log(`전송 버튼 클릭 message=${inputMessage}`);
        if(socket.current) {
            socket.current.sendMessage(username, inputMessage);
        } else {
            alert('채팅에 연결되어있지 않습니다.');
        }
        setInputMessage('');
    }

    const handleEnterKeyDown = (event) => {
        if (event.key === 'Enter') {
            onClickSendButton();
        }
      };

    return (
        <div className="chat-wrapper">
            <div className="chat-container" ref={scrollRef}>
                {
                    chats.map((message) => {
                        return <ChatMessage 
                            messageInfo={message}
                        />;
                    })
                }
            </div>
            <div className="chat-input-container">
                <input 
                    type="text" 
                    className="chat-input" 
                    placeholder="메시지를 입력하세요..."
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    onKeyDown={handleEnterKeyDown}
                 />
                <button className="chat-send-btn" onClick={onClickSendButton}>
                    <i className="bi bi-send"></i>
                </button>
            </div>
        </div>
    );

    
}

export default Chat;