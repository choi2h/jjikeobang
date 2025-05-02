package com.jjikeobang.chat.model;

import jakarta.websocket.Session;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ChatConnectInfo {
    private Long roomId;
    private Map<String, Session> participants;

    public ChatConnectInfo(Long roomId) {
        this.roomId = roomId;
        participants = new HashMap<>();
    }

    public void AddUser(Session session) {
        this.participants.put(session.getId(), session);
    }

    public void RemoveUser(String sessionId) {
        if(this.participants.containsKey(sessionId)) participants.remove(sessionId);
    }

    public boolean isEmptyRoom() {
        return this.participants.isEmpty();
    }

    public List<Session> getParticipants() {
        return new ArrayList<>(participants.values());
    }
}
