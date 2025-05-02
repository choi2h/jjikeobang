package com.jjikeobang.chat.service;

import jakarta.websocket.Session;

public interface ChatConnectionService {
    boolean isExistRoom(Long roomId);
    void addRoom(Long roomId);
    void addParticipant(Long roomId, Session session);
    void removeParticipant(Long roomId, String sessionId);
}
