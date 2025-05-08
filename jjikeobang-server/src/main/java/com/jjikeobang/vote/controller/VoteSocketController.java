package com.jjikeobang.vote.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jjikeobang.util.JsonUtil;
import com.jjikeobang.vote.model.VoteRequestDTO;
import com.jjikeobang.vote.model.VoteCounting;
import com.jjikeobang.vote.model.VoteCountingMap;
import com.jjikeobang.vote.service.VoteService;
import com.jjikeobang.vote.service.VoteServiceImpl;
import jakarta.servlet.http.HttpServlet;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;

import java.io.IOException;
import java.io.StringReader;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/vote/{roomId}")
public class VoteSocketController extends HttpServlet {
    private static Map<Long, List<Session>> roomClients = new ConcurrentHashMap<>();
    private static final Object lock = new Object();

    private static final VoteService voteService = new VoteServiceImpl();
    @OnOpen
    public void onOpen(Session session, @PathParam("roomId") Long roomId) throws IOException {
        roomClients.computeIfAbsent(roomId, key -> Collections.synchronizedList(new ArrayList<>())).add(session);

        JsonUtil jsonUtil = JsonUtil.getInstance();

        if (session.isOpen()) {
            VoteCounting voteCounting = VoteCountingMap.get(roomId);
            if (voteCounting != null) {
                Map<String, Object> messageMap = voteCounting.toObjectMap();
                messageMap.put("type","vote");

                String msg = jsonUtil.getJsonFromObject(messageMap);
                session.getBasicRemote().sendText(msg);
            } else {
                session.getBasicRemote().sendText("{\"type\":\"error\", \"message\":\"투표 정보가 초기화되지 않았습니다.\"}");
            }
        }
    }

    @OnMessage
    public void onMessage(String message, @PathParam("roomId") Long roomId) throws IOException {
        JsonUtil jsonUtil = JsonUtil.getInstance();
        VoteRequestDTO voteInfo = jsonUtil.getObjectFromJson(new StringReader(message), VoteRequestDTO.class);

        long candidateId = voteInfo.candidateId();

        VoteCounting voteCounting = VoteCountingMap.get(roomId);
        voteCounting.vote(candidateId);
        voteService.voteCandidate(roomId, candidateId);

        broadcast(roomId, voteCounting.toObjectMap(), "vote");
    }

    public static void broadcast(Long roomId, Map<String, Object> message, String type) {
        List<Session> sessions = roomClients.get(roomId);
        JsonUtil jsonUtil = JsonUtil.getInstance();
        try{
            synchronized (lock) {
                message.put("type", type);
                String response = jsonUtil.getJsonFromObject(message);
                for (Session client : sessions) {
                    if (client.isOpen()) {
                        client.getBasicRemote().sendText(response);
                    }
                }
            }
        }catch (IOException e){
            e.printStackTrace();
        }
    }

    @OnClose
    public void onClose(Session session, @PathParam("roomId") Long roomId) {
        List<Session> room = roomClients.get(roomId);
        room.remove(session);
        // todo: room 비었을 때(투표가 끝났을 때) db 처리
    }
}
