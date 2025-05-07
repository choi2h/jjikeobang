package com.jjikeobang.chat.service;

import com.jjikeobang.chat.model.ChatConnectInfo;
import jakarta.websocket.Session;

import java.util.HashMap;
import java.util.List;
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

        // TODO 임시데이터
        roomConnections.put(1L, new ChatConnectInfo(1L));
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
        System.out.println("Add participant roomId:" + roomId + " session:" + session.getId());
        roomConnections.get(roomId).addUser(session);
    }

    @Override
    public void removeParticipant(Long roomId, String sessionId) {
        ChatConnectInfo chatConnectInfo = roomConnections.get(roomId);
        chatConnectInfo.removeUser(sessionId);
        System.out.println("채팅방 연결 정보:" + chatConnectInfo.getParticipants().size() + " roomId=" + roomId);

        if(chatConnectInfo.isEmptyRoom()) {
            roomConnections.remove(roomId);
        }
    }

    @Override
    public List<Session> getParticipantsFromRoom(Long roomId) {
        ChatConnectInfo chatConnectInfo = roomConnections.get(roomId);
        System.out.println("채팅방 연결 정보:" + chatConnectInfo.getParticipants().size() + " roomId=" + roomId);
        return chatConnectInfo.getParticipants();
    }
}
