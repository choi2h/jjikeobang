package com.jjikeobang.chat.controller;

import com.jjikeobang.chat.service.ChatConnectionServiceImpl;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;

import java.io.IOException;

// http -> ws://
@ServerEndpoint("/chat/{roomId}")
public class WebSocketController {

    private final ChatConnectionServiceImpl chatConnectionService;

    public WebSocketController() {
        this.chatConnectionService = ChatConnectionServiceImpl.getInstance();
    }

    @OnOpen
    public void onOpen(Session session, @PathParam("roomId") Long roomId) throws IOException {
        System.out.println("새로운 세션이 연결되었습니다. roomId=" +roomId + ", sessionId="+ session.getId());
        if(!chatConnectionService.isExistRoom(roomId)) {
            session.close(new CloseReason(CloseReason.CloseCodes.CANNOT_ACCEPT, "존재하지 않는 방입니다."));
            return;
        }

        // 사용자 추가
        chatConnectionService.addParticipant(roomId, session);
        // 사용자 정보로 참여 기록 저장 추가

    }

    @OnClose
    public void onClose(Session session, @PathParam("roomId") Long roomId) {
        String sessionID = session.getId();
        System.out.println("세션을 닫습니다. roomId=" + roomId + ", sessionId=" + sessionID);
        if(chatConnectionService.isExistRoom(roomId)) {
            chatConnectionService.removeParticipant(roomId, sessionID);
        }
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("메시지를 전달 받았습니다." );
        System.out.println(session.getId() + " : " + message);
    }

}
