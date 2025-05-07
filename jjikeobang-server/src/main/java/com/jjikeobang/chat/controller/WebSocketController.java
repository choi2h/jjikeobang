package com.jjikeobang.chat.controller;

import com.jjikeobang.chat.model.MessageType;
import com.jjikeobang.chat.model.SendMessage;
import com.jjikeobang.chat.model.WebSocketMessage;
import com.jjikeobang.chat.service.ChatConnectionServiceImpl;
import com.jjikeobang.util.JsonUtil;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.List;

// http -> ws://
// /chat/{roomId}?username={username}
@ServerEndpoint("/chat/{roomId}")
public class WebSocketController {

    private static final String SERVER_SEND = "SERVER";
    private final ChatConnectionServiceImpl chatConnectionService;
    private final JsonUtil jsonUtil;
    private static final Object lock = new Object();

    public WebSocketController() {
        this.chatConnectionService = ChatConnectionServiceImpl.getInstance();
        this.jsonUtil = JsonUtil.getInstance();
    }

    @OnOpen
    public void onOpen(Session session, @PathParam("roomId") Long roomId) throws IOException {
        // url query parameter를 통해 회원 채팅방 이름 가져오기
        String param = session.getQueryString().split("=")[1];
        String username = URLDecoder.decode(param, "utf-8");
        session.getUserProperties().put("username", username);
        System.out.println("새로운 세션이 연결되었습니다. roomId=" +roomId + ", sessionId="+ session.getId() + ", username=" + username);

        // 방 존재 여부 체크
        if(!chatConnectionService.isExistRoom(roomId) && session.isOpen()) {
            session.close(new CloseReason(CloseReason.CloseCodes.CANNOT_ACCEPT, "존재하지 않는 방입니다."));
            return;
        }

        // 사용자 추가
        chatConnectionService.addParticipant(roomId, session);
        // 사용자 정보로 참여 기록 저장 추가

        // 입장 메시지 전달
        broadcast(roomId, MessageType.NOTICE, SERVER_SEND, String.format(SendMessage.ENTER_USER, username));
        sendMessage(session, MessageType.NOTICE, SendMessage.WAITING_VOTE);
        sendMessage(session, MessageType.NOTICE, SendMessage.FREE_CHAT_BEFORE_VOTE);
    }

    @OnClose
    public void onClose(Session session, @PathParam("roomId") Long roomId) {
        String sessionID = session.getId();
        System.out.println("세션을 닫습니다. roomId=" + roomId + ", sessionId=" + sessionID);
        if(chatConnectionService.isExistRoom(roomId)) {
            chatConnectionService.removeParticipant(roomId, sessionID);
            String userName = (String) session.getUserProperties().get("username");
            broadcast(roomId, MessageType.NOTICE, SERVER_SEND, String.format(SendMessage.LEAVE_USER, userName));
        }
    }

    @OnMessage
    public void onMessage(String message, Session session, @PathParam("roomId") Long roomId) throws IOException {
        System.out.println("메시지를 전달 받았습니다." );
        System.out.println(session.getId() + " : " + message);
        WebSocketMessage webSocketMessage = jsonUtil.getObjectFromJson(message, WebSocketMessage.class);
        System.out.println("받은 메시지 : " + webSocketMessage);

        broadcast(roomId, MessageType.MESSAGE, webSocketMessage.getName(), webSocketMessage.getText());
    }

    private void sendMessage(Session session, MessageType messageType, String message) {
        try {
            WebSocketMessage webSocketMessage = new WebSocketMessage(messageType, "Server", message);
            session.getBasicRemote().sendText(jsonUtil.getJsonFromObject(webSocketMessage));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void broadcast(Long roomId, MessageType messageType, String sendName, String message) {
        List<Session> participants = chatConnectionService.getParticipantsFromRoom(roomId);
        WebSocketMessage webSocketMessage = new WebSocketMessage(messageType, sendName, message);
        try {
            synchronized (lock) {
                for(Session session : participants) {
                    if(session.isOpen()) session.getBasicRemote().sendText(jsonUtil.getJsonFromObject(webSocketMessage));
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @OnError
    public void onError(Session session, Throwable error) {
        System.out.println("에러 발생!! sessionId=" + session.getId() + ", error=" + error.getMessage());
    }
}
