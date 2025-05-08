package com.jjikeobang.vote.controller;

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

        System.out.println("투표 세션 연결 성공 : userId = " + session.getId());

        if (session.isOpen()) {
            VoteCounting voteCounting = VoteCountingMap.get(roomId);
            if (voteCounting != null) {
                session.getBasicRemote().sendText(voteCounting.toJson("vote"));
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

        broadcast(roomId, voteCounting);
    }

    private static void broadcast(Long roomId, VoteCounting voteCounting) {
        List<Session> sessions = roomClients.get(roomId);
        try{
            synchronized (lock) {
                String response = voteCounting.toJson("vote");
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
    public void onClose(Session session, @PathParam("roomId") String roomId) {
        List<Session> room = roomClients.get(roomId);
        // todo: room 비었을 때(투표가 끝났을 때) db 처리
    }
}
