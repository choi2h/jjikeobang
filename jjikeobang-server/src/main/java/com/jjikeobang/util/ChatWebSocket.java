package com.jjikeobang.util;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jjikeobang.room.model.Room;
import com.jjikeobang.room.service.RoomService;
import com.jjikeobang.room.service.RoomServiceImpl;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;

@ServerEndpoint("/chat/ws/{roomId}")
public class ChatWebSocket {
	private final RoomService roomService = new RoomServiceImpl();
	
	private static final Map<String, Set<Session>> roomSessions = new ConcurrentHashMap<>();

	@OnOpen
	public void onOpen(Session session, @PathParam("roomId") String roomId) {
		roomSessions.computeIfAbsent(roomId, k -> ConcurrentHashMap.newKeySet()).add(session);
	}

	@OnMessage
	public void onMessage(String message, @PathParam("roomId") String roomId, Session senderSession) throws JsonMappingException, JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		JsonNode msg = mapper.readTree(message);
		
		String msgType = msg.get("type").asText();
		
		// 일반 채팅 메세지 (각 채팅방의 참여자에게 송신)
		if ("CHAT".equals(msgType)) {
			for (Session s : roomSessions.get(roomId)) {
				if(!s.equals(senderSession)) {
					s.getAsyncRemote().sendText(message);
				}
			}
		}
		
		// 투표 시작 메세지 (각 채팅방의 참여자에게  -> 이 메세지는 수신측 채팅창에 출력되면 안됨)
		if ("VOTE_START".equals(msgType)) {
			
			//1.총 투표자 수
			int totalEntryCount = roomSessions.get(roomId).size();//TOTAL_ENTRY_COUNT
			Room roomParam = new Room();
			roomParam.setRoomId(Long.parseLong(roomId));
			roomParam.setTotalEntryCount(totalEntryCount);
			roomParam.setVoteStatus("02");
			
			//2.총 투표자 수 및 투표진행상태 업데이트 
			roomService.updateRoom(roomParam);
			
			//3.투표 종료 시간
			Room room = roomService.findById(Long.parseLong(roomId));
			int voteDuration = room.getVoteDuration(); //분
			long duration = voteDuration * 60 * 1000; // 밀리초로 변환
			
			// 현재 시간에 제한 시간을 더하여 종료 시간 계산
		    long endTime = System.currentTimeMillis() + duration;
			
			//4.방 참여자에게 화면 전환 코드 발송 (투표 준비 -> 투표 진행)
			for (Session s : roomSessions.get(roomId)) {
				s.getAsyncRemote().sendText("{\"type\":\"VOTE_START\", \"totalEntryCount\":\"" + totalEntryCount + "\", \"endTime\":\"" +  endTime + "\"}");
			}
		}
		
		// 투표 종료 메세지
		if ("VOTE_END".equals(msgType)) {
			for (Session s : roomSessions.get(roomId)) {
				if(!s.equals(senderSession)) {
					s.getAsyncRemote().sendText("{\"type\":\"VOTE_END\"}");
				}
			}
		}
		
		// 총 투표 수 증가 메세지 
		if ("VOTE_COUNT".equals(msgType)) {
			int voteCount = Integer.parseInt(msg.get("voteCount").asText());
			for (Session s : roomSessions.get(roomId)) {
				s.getAsyncRemote().sendText("{\"type\":\"VOTE_COUNT\", \"voteCount\":\"" + voteCount + "\"}");
			}
		}
		
		// 투표 남은 시간
		if ("VOTE_TIMER".equals(msgType)) {
			
		}
				
		
		// 공지 사항 (방 ID와 상관없이 모든 채팅창에 송신)
		/*
		if ("NOTICE".equals(msgType)) {
			for (Session s : roomSessions.get(roomId)) {
				s.getAsyncRemote().sendText("{\"type\":\"VOTE_START\"}");
			}
			
			for(String keyRoomId : roomSessions.keySet()) {
				for(Session s : roomSessions.get(keyRoomId)) {
					s.getAsyncRemote().sendText("투표가 시작되었습니다.");
				}
			}
		}
		*/
	}

	@OnClose
	public void onClose(Session session, @PathParam("roomId") String roomId) {
		Set<Session> sessions = roomSessions.get(roomId);
		if (sessions != null) sessions.remove(session);
	}
}