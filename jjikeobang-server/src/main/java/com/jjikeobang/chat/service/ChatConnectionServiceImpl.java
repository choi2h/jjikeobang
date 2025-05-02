package com.jjikeobang.chat.service;

import com.jjikeobang.chat.model.ChatConnectInfo;
import jakarta.websocket.Session;

import java.util.HashMap;
import java.util.Map;

public class ChatConnectionServiceImpl implements ChatConnectionService {

    private static ChatConnectionServiceImpl chatConnectionService;
    public static ChatConnectionServiceImpl getInstance() {
        synchronized (ChatConnectionServiceImpl.class) {
            if(chatConnectionService == null) {
                chatConnectionService = new ChatConnectionServiceImpl();
            }
        }
        return chatConnectionService;
    }

    private final Map<Long, ChatConnectInfo> roomConnections;

    private ChatConnectionServiceImpl() {
        roomConnections = new HashMap<>();
    }

    @Override
    public boolean isExistRoom(Long roomId) {
        return roomConnections.containsKey(roomId);
    }

    @Override
    public void addRoom(Long roomId) {
        System.out.println("Add room roomId:" + roomId);
        if(roomConnections.containsKey(roomId)) {
//            throw new RuntimeException("Already exist room");
            System.out.println("Already exist room.");
            return;
        }

        roomConnections.put(roomId, new ChatConnectInfo(roomId));
    }

    @Override
    public void addParticipant(Long roomId, Session session) {
        roomConnections.get(roomId).AddUser(session);
    }

    @Override
    public void removeParticipant(Long roomId, String sessionId) {
        roomConnections.get(roomId).RemoveUser(sessionId);
    }
}
