import React, {useState, useEffect} from "react";


const API_URL = process.env.REACT_APP_API_URL;

const SSETest = () => {
        const [message, setMessage] = useState("");
        const [connected, setConnected] = useState(false);
        const [error, setError] = useState("");
      
        useEffect(() => {
          // 서버의 SSE 엔드포인트와 연결
          const roomId = "testRoom"; // 예시 방 ID
          const eventSource = new EventSource(`${API_URL}/connect?roomId=${roomId}`);
      
          // SSE 이벤트 처리
          eventSource.onopen = () => {
            console.log("Connected to SSE server.");
            setConnected(true);
            setError("");
          };
      
          eventSource.onmessage = (event) => {
            // 서버에서 보내는 데이터 처리
            if (event.data === "heartbeat") {
              console.log("Heartbeat received");
            } else {
              setMessage(event.data);
            }
          };
      
          eventSource.onerror = (err) => {
            console.error("SSE error:", err);
            setError("Failed to connect or SSE error occurred.");
            eventSource.close();
            setConnected(false);
          };
      
          // 컴포넌트가 언마운트되면 SSE 연결 종료
          return () => {
            eventSource.close();
          };
        }, []);
      
        return (
          <div>
            <h1>Server-Sent Events (SSE) Test</h1>
            {connected ? (
              <div>
                <p>Connected to server. Waiting for messages...</p>
                {message && <p>Message: {message}</p>}
              </div>
            ) : (
              <p>{error || "Connecting to server..."}</p>
            )}
          </div>
        );
}

export default SSETest;