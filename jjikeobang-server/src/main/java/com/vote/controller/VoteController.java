package com.vote.controller;

import com.jjikeobang.candidate.model.Candidate;
import com.jjikeobang.util.JsonUtil;
import com.vote.model.VoteBroadcastDTO;
import com.vote.model.VoteInfoDTO;
import com.vote.service.VoteService;
import com.vote.service.VoteServiceImpl;
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
public class VoteController {
    private static Map<String, List<Session>> roomClients = new HashMap<>();
    private final VoteService voteService = new VoteServiceImpl();
    private static final Object lock = new Object();

    @OnOpen
    public void onOpen(Session session, @PathParam("roomId") String roomId) {
        roomClients.computeIfAbsent(roomId, key -> Collections.synchronizedList(new ArrayList<>())).add(session);
    }

    @OnMessage
    public void onMessage(String message, @PathParam("roomId") String roomId) throws IOException {
        JsonUtil jsonUtil = JsonUtil.getInstance();
        VoteInfoDTO voteInfo = jsonUtil.getObjectFromJson(new StringReader(message), VoteInfoDTO.class);

        int candidateId = Integer.parseInt(voteInfo.candidateId());

        Candidate candidate = voteService.findById(Long.parseLong(roomId), candidateId);
        int voteCount = candidate.getVoteCount();
        voteService.vote(candidate);

        VoteBroadcastDTO broadcastDTO = new VoteBroadcastDTO(String.valueOf(candidateId), ++voteCount);

        broadcast(roomId, broadcastDTO);
    }

    private static void broadcast(String roomId, VoteBroadcastDTO broadcastDTO) {
        List<Session> sessions = roomClients.get(roomId);
        JsonUtil jsonUtil = JsonUtil.getInstance();

        try{
            synchronized (lock) {
                for (Session client : sessions) {
                    if (client.isOpen()) {
                        String response = jsonUtil.getJsonFromObject(broadcastDTO);
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
