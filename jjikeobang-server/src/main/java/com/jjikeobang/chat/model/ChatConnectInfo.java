package com.jjikeobang.chat.model;

import jakarta.websocket.Session;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ChatConnectInfo {
    private Long roomId;
    private final Map<String, Session> participants;

    public ChatConnectInfo(Long roomId) {
        this.roomId = roomId;
        participants = new HashMap<>();
    }

    public void addUser(Session session) {
        synchronized (participants) {
            this.participants.put(session.getId(), session);
            System.out.println("Add user on chat connect info. roomId=" + roomId + " session=" + session.getId() + " participants=" + participants.size());
        }
    }

    public void removeUser(String sessionId) {
        synchronized (participants) {
            if(this.participants.containsKey(sessionId)) participants.remove(sessionId);
        }
    }

    public boolean isEmptyRoom() {
        return this.participants.isEmpty();
    }

    public List<Session> getParticipants() {
        synchronized (participants) {
            return new ArrayList<>(participants.values());
        }
    }
}
