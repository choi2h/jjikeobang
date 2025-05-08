package com.jjikeobang.chat.service;

import com.jjikeobang.chat.model.MessageType;
import com.jjikeobang.chat.model.WebSocketMessage;
import com.jjikeobang.util.JsonUtil;
import jakarta.websocket.Session;

import java.io.IOException;
import java.util.List;

public class SendMessageServiceImpl implements SendMessageService {
    private final ChatConnectionServiceImpl chatConnectionService;
    private final JsonUtil jsonUtil;
    private static final Object lock = new Object();

    public SendMessageServiceImpl() {
        this.chatConnectionService = ChatConnectionServiceImpl.getInstance();
        this.jsonUtil = JsonUtil.getInstance();
    }

    public void sendMessage(Session session, MessageType messageType, String message) {
        try {
            WebSocketMessage webSocketMessage = new WebSocketMessage(messageType, "Server", message);
            session.getBasicRemote().sendText(jsonUtil.getJsonFromObject(webSocketMessage));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void broadcast(Long roomId, MessageType messageType, String sendName, String message) {
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
}
