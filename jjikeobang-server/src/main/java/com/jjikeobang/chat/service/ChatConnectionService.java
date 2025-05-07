package com.jjikeobang.chat.service;

import jakarta.websocket.Session;

import java.util.List;

public interface ChatConnectionService {
    boolean isExistRoom(Long roomId);
    void addRoom(Long roomId);
    void addParticipant(Long roomId, Session session);
    void removeParticipant(Long roomId, String sessionId);
    List<Session> getParticipantsFromRoom(Long roomId);
}
