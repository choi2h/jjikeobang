package com.vote.controller;

import com.fasterxml.jackson.core.SerializableString;
import com.jjikeobang.candidate.model.Candidate;
import com.jjikeobang.candidate.service.CandidateRoomService;
import com.jjikeobang.candidate.service.CandidateRoomServiceImpl;
import com.jjikeobang.util.JsonUtil;
import com.vote.model.VoteBroadcastDTO;
import com.vote.model.VoteInfoDTO;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.util.*;

@ServerEndpoint("/vote/{roomId}")
public class VoteController {
    private static Map<String, List<Session>> roomClients = new HashMap<>();
    private final CandidateRoomService candidateRoomService = new CandidateRoomServiceImpl();
    @OnOpen
    public void onOpen(Session session, @PathParam("roomId") String roomId){
        roomClients.computeIfAbsent(roomId, key -> Collections.synchronizedList(new ArrayList<>())).add(session);
    }

    @OnMessage
    public void broadcast(String message, Session session, @PathParam("roomId") String roomId){
        List<Session> sessions = roomClients.get(roomId);
        JsonUtil jsonUtil = JsonUtil.getInstance();
        try{
            VoteInfoDTO voteInfo = jsonUtil.getObjectFromJson(new StringReader(message), VoteInfoDTO.class);

            int candidateId = Integer.parseInt(voteInfo.candidateId());
            int voteCount;

            List<Candidate> candidates = candidateRoomService.findAllByRoomId(Long.parseLong(roomId));

            Optional<Candidate> first = candidates.stream().filter(s -> candidateId == s.getCandidateId()).findFirst();

            if(first.isPresent()){
                voteCount = first.get().getVoteCount();
            }else{
                throw new IllegalArgumentException("voteCount 조회 실패");
            }

            // voteCount++ db 저장

            VoteBroadcastDTO broadcastDTO = new VoteBroadcastDTO(String.valueOf(candidateId), voteCount);

            for (Session client : sessions) {
                String response = jsonUtil.getJsonFromObject(broadcastDTO);
                client.getBasicRemote().sendText(response);
            }
        }catch (IOException e){
            e.printStackTrace();
        }
    }
    @OnClose
    public void onClose(Session session, @PathParam("roomId") String roomId){
        roomClients.get(roomId).remove(session);
    }
}
