package com.jjikeobang.chat.controller;

import com.jjikeobang.chat.model.SendMessage;
import com.jjikeobang.chat.model.WebSocketMessage;
import com.jjikeobang.chat.service.ChatConnectionServiceImpl;
import com.jjikeobang.util.JsonUtil;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;

import java.io.IOException;
import java.util.List;

// http -> ws://
@ServerEndpoint("/chat/{roomId}")
public class WebSocketController {

    private final ChatConnectionServiceImpl chatConnectionService;
    private final JsonUtil jsonUtil;

    public WebSocketController() {
        this.chatConnectionService = ChatConnectionServiceImpl.getInstance();
        this.jsonUtil = JsonUtil.getInstance();
    }

    @OnOpen
    public void onOpen(Session session, @PathParam("roomId") Long roomId) throws IOException {
        System.out.println("새로운 세션이 연결되었습니다. roomId=" +roomId + ", sessionId="+ session.getId());
        if(!chatConnectionService.isExistRoom(roomId) && session.isOpen()) {
            session.close(new CloseReason(CloseReason.CloseCodes.CANNOT_ACCEPT, "존재하지 않는 방입니다."));
            return;
        }

        // 사용자 추가
        chatConnectionService.addParticipant(roomId, session);
        // 사용자 정보로 참여 기록 저장 추가

        // 입장 메시지 전달
        broadcast(roomId, String.format(SendMessage.ENTER_USER, "user"));

    }

    @OnClose
    public void onClose(Session session, @PathParam("roomId") Long roomId) {
        String sessionID = session.getId();
        System.out.println("세션을 닫습니다. roomId=" + roomId + ", sessionId=" + sessionID);
        if(chatConnectionService.isExistRoom(roomId)) {
            chatConnectionService.removeParticipant(roomId, sessionID);
            broadcast(roomId, String.format(SendMessage.LEAVE_USER, "user"));
        }
    }

    @OnMessage
    public void onMessage(String message, Session session, @PathParam("roomId") Long roomId) throws IOException {
        System.out.println("메시지를 전달 받았습니다." );
        System.out.println(session.getId() + " : " + message);
        WebSocketMessage webSocketMessage = jsonUtil.getObjectFromJson(message, WebSocketMessage.class);
        System.out.println(webSocketMessage);

        broadcast(roomId, webSocketMessage.getText());
    }

    private void broadcast(Long roomId, String message) {
        List<Session> participants = chatConnectionService.getParticipantsFromRoom(roomId);

        try {
            for(Session session : participants) {
                session.getBasicRemote().sendText("나 메시지 받았어!!! \n" + message);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @OnError
    public void onError(Session session, Throwable error) {
        System.out.println(error.getMessage());
    }
}
