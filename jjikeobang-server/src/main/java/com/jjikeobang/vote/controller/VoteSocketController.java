package com.jjikeobang.vote.controller;

import com.jjikeobang.candidate.model.Candidate;
import com.jjikeobang.util.JsonUtil;
import com.jjikeobang.vote.model.CandidateInfo;
import com.jjikeobang.vote.model.VoteRequestDTO;
import com.jjikeobang.vote.model.VoteResult;
import com.jjikeobang.vote.model.VoteResultMap;
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

@ServerEndpoint("/vote/{roomId}")
public class VoteSocketController extends HttpServlet {
    private static Map<Long, List<Session>> roomClients = new HashMap<>();

    private final VoteService voteService = new VoteServiceImpl();
    private static final Object lock = new Object();

    @OnOpen
    public void onOpen(Session session, @PathParam("roomId") Long roomId) {
        roomClients.computeIfAbsent(roomId, key -> Collections.synchronizedList(new ArrayList<>())).add(session);

        VoteResult voteResult = VoteResultMap.get(roomId);
        broadcast(roomId, voteResult);
    }

    @OnMessage
    public void onMessage(String message, @PathParam("roomId") Long roomId) throws IOException {
        JsonUtil jsonUtil = JsonUtil.getInstance();
        VoteRequestDTO voteInfo = jsonUtil.getObjectFromJson(new StringReader(message), VoteRequestDTO.class);

        long candidateId = voteInfo.candidateId();

        VoteResult voteResult = VoteResultMap.get(roomId);
        voteResult.vote(candidateId);

        broadcast(roomId, voteResult);
    }

    private static void broadcast(Long roomId, VoteResult voteResult) {
        List<Session> sessions = roomClients.get(roomId);
        try{
            synchronized (lock) {
                for (Session client : sessions) {
                    if (client.isOpen()) {
                        String response = voteResult.toJson();
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
        room.remove(session);
        // todo: room 비었을 때(투표가 끝났을 때) db 처리
    }
}
