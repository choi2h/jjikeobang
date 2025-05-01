package com.jjikeobang.room.controller;

import java.io.IOException;
import java.sql.SQLException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jjikeobang.room.model.Room;
import com.jjikeobang.room.service.RoomService;
import com.jjikeobang.room.service.RoomServiceImpl;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/room")
public class RoomController extends HttpServlet{
	
    private final RoomService roomService;

	public RoomController() {
		roomService = new RoomServiceImpl();
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		
		// Jackson ObjectMapper 생성
        ObjectMapper objectMapper = new ObjectMapper();

        // JSON 요청 본문을 Room 객체로 매핑
        Room room = objectMapper.readValue(req.getReader(), Room.class);

        try {
        	
    		HttpSession session = req.getSession(false);
    		
    		/********** 테스트용 **********/
    		if(session == null) {
    			session = req.getSession(true);
    			Long id = 777L;
    			session.setAttribute("memberId", id);
    		}
    		/********** 테스트용 **********/
			
    		if (session == null || session.getAttribute("memberId") == null) {
			    res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			    return;
			}
			Long memberId = (Long) session.getAttribute("memberId");
			room.setCreateMemberId(memberId);
        	
			//방 정보 저장
			roomService.insertRoom(room);
			
			// 응답
			res.setContentType("application/json");
			res.setCharacterEncoding("UTF-8");
			res.setStatus(HttpServletResponse.SC_OK);
			objectMapper.writeValue(res.getWriter(), room);
		} catch (SQLException e) {
			e.printStackTrace();
			res.setContentType("application/json");
			res.setCharacterEncoding("UTF-8");
			res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			res.getWriter().write("{\"success\": false}");
		}
	}
}
