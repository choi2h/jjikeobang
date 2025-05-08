package com.jjikeobang.chat.service;

import com.jjikeobang.chat.model.MessageType;
import jakarta.websocket.Session;

public interface SendMessageService {
    void sendMessage(Session session, MessageType messageType, String message);
    void broadcast(Long roomId, MessageType messageType, String sendName, String message);
}
