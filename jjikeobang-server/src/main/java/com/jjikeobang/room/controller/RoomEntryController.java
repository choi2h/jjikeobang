package com.jjikeobang.room.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.jjikeobang.room.model.Room;
import com.jjikeobang.room.service.RoomService;
import com.jjikeobang.room.service.RoomServiceImpl;
import com.jjikeobang.util.JsonUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/room/entry")
public class RoomEntryController extends HttpServlet{
	
	private final RoomService roomService;
	//private final CandidateRoomService candidateService;
	
	public RoomEntryController() {
		this.roomService = new RoomServiceImpl();
		//this.candidateService = new CandidateRoomServiceImpl();
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		String entryCode = req.getParameter("entryCode");
		
		System.out.println(entryCode);
		
		// 입장코드 검증 및 투표방정보 조회
		Room room = roomService.findByEntryCode(entryCode);
		
		if(room == null) {//유효하지 않은 입력 코드 처리 410
			setResponse(res, HttpServletResponse.SC_GONE, false);
			res.getWriter().write("{\"success\": false, \"message\": \"입력코드가 틀렸습니다. 입력코드를 확인해 주세요.\"}");
			return;
		}
		
		if(room != null && "02".equals(room.getVoteStatus())) {
			setResponse(res, HttpServletResponse.SC_GONE, false);
			res.getWriter().write("{\"success\": false, \"message\": \"투표가 진행중인 방은 입장할 수 없습니다.\"}");
			return;
		}
		
		if(room != null && "03".equals(room.getVoteStatus())) {
			setResponse(res, HttpServletResponse.SC_GONE, false);
			res.getWriter().write("{\"success\": false, \"message\": \"투표가 종료된 방입니다.\"}");
			return;
		}
		
		Map<String, Object> roomInfo = new HashMap<String, Object>();
		roomInfo.put("roomInfo", room);
		roomInfo.put("success", true);
		
		JsonUtil jsonUtil = JsonUtil.getInstance();
		setResponse(res, HttpServletResponse.SC_OK, true);
		res.getWriter().write(jsonUtil.getJsonFromObject(roomInfo));
	}
	
	private void setResponse(HttpServletResponse res, int responseCode, boolean isSuccess) throws IOException {
		res.setContentType("application/json");
		res.setCharacterEncoding("UTF-8");
		res.setStatus(responseCode);
	}
}
