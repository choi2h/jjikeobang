import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";

function Chat({roomId, socket, handleVoteEvent, setTotalVoteCount, setEndTime, setCurrentVoteCount}) {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);
    
    const chatEndRef = useRef(null); // 채팅 스크롤 위치를 추적할 ref

    // 수신 메시지 처리
    useEffect(() => {
        if (!socket.current) {
            socket.current = new WebSocket('ws://localhost:8080/chat/ws/' + roomId);

            socket.current.onmessage = (event) => {
                const incomingMessage = JSON.parse(event.data);

                if(incomingMessage.type === 'CHAT'){
                    setChatLog((prev) => [...prev, incomingMessage]);
                }

                //투표 시작
                if(incomingMessage.type === 'VOTE_START'){
                    if(handleVoteEvent){
                        handleVoteEvent();
                    }
                    setTotalVoteCount(incomingMessage.totalEntryCount);
                    setEndTime(incomingMessage.endTime);
                }

                //투표하기 / 기권하기 => 현재 투표수 업데이트
                if(incomingMessage.type === 'VOTE_COUNT'){
                    //console.log(incomingMessage.voteCount);
                    setCurrentVoteCount(incomingMessage.voteCount);
                };
            };

            socket.current.onclose = () => {
                console.log("WebSocket 연결이 닫혔습니다.");
            };
        }
        /*
        return () => {
            if (socket.current) {
                socket.current.close(); // 컴포넌트 언마운트 시 WebSocket 닫기
            }
        };
        */
    }, []);

    // 채팅 창 자동 스크롤
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatLog]); // 채팅 메시지가 변경될 때마다 실행
    
    // 메시지 전송
    const sendMessage = () => {
        if (!socket.current || message.trim() === '') return;
    
        const msgObj = {
            type: 'CHAT',
            content: message,
            sender: roomId,
            timestamp: new Date().toLocaleTimeString('ko-KR', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            })
        };
    
        // 서버로 메시지 전송
        socket.current.send(JSON.stringify(msgObj));
    
        // 발신 메시지 채팅 로그 추가
        setChatLog((prev) => [...prev, msgObj]);
        setMessage(''); // 입력창 초기화

        // 채팅 창 자동 스크롤
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
    
    // 공지 (현재 시간)
    const currentTime = new Date().toLocaleTimeString('ko-KR', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return (
        <div>
            <div className="chat-container">
                <ChatMessage message={"잠시만 기다려주세요. 곧 투표가 시작됩니다."} time={currentTime}/>
                <ChatMessage message={"투표 시작 전까지 자유롭게 대화해주세요!"} time={currentTime}/>

                {chatLog.map((msg, idx) => (
                    <ChatMessage key={idx} message={msg.content} time={msg.timestamp}/>
                ))}
                <div ref={chatEndRef}></div> {/* 스크롤 위치를 추적하는 요소 */}
            </div>
            <div className="chat-input-container">
                <input type="text" className="chat-input" value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="메시지를 입력하세요..." />
                <button className="chat-send-btn" onClick={sendMessage}>
                    <i className="bi bi-send"></i>
                </button>
            </div>
        </div>
    );
}

export default Chat;