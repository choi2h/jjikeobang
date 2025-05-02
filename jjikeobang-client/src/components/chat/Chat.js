import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import SocketService from "../../service/SocketService";

function Chat({roomId}) {
    const socket = useRef(null);
    console.log('컴포넌트 마운트');
    useEffect(() => {
        if(!socket.current) {
            const socketService = new SocketService(roomId);
            socket.current = socketService;
        }

        return () => {
            if(socket.current) {
                socket.current.close();
                socket.current = null;
            }
        }
    });

    const onClickSendButton = () => {
        console.log('전송 버튼 클릭');
        if(socket.current) {
            socket.current.sendMessage('user1', 'i can send message!!!!');
        } else {
            alert('채팅에 연결되어있지 않습니다.');
        }
    }

    return (
        <div>
            <div className="chat-container">
                <ChatMessage message={"잠시만 기다려주세요. 곧 투표가 시작됩니다."} time={"08:55:45"}/>
                <ChatMessage message={"투표 시작 전까지 자유롭게 대화해주세요!"} time={"08:57:15"}/>
            </div>
            <div className="chat-input-container">
                <input type="text" className="chat-input" placeholder="메시지를 입력하세요..." />
                <button className="chat-send-btn" onClick={onClickSendButton}>
                    <i className="bi bi-send"></i>
                </button>
            </div>
        </div>
    );

    
}

export default Chat;