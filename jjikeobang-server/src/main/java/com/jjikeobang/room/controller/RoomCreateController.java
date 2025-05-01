package com.jjikeobang.room.controller;

import java.io.IOException;
import java.sql.SQLException;

import com.jjikeobang.room.model.Room;
import com.jjikeobang.room.service.RoomService;
import com.jjikeobang.room.service.RoomServiceImpl;

import com.jjikeobang.util.JsonUtil;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/room/create")
public class RoomCreateController extends HttpServlet{
	
    private final RoomService roomService;
	private final JsonUtil jsonUtil;

	public RoomCreateController() {
		roomService = new RoomServiceImpl();
		jsonUtil = JsonUtil.getInstance();
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException {
        // JSON 요청 본문을 Room 객체로 매핑
		Room room;
		try {
			room = jsonUtil.getObjectFromJson(req.getReader(), Room.class);
		} catch (IOException e) {
			setResponse(res, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false);
			e.printStackTrace();
			return;
		}

        //방 정보 저장
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
			roomService.insertRoom(room);

			// 응답
			setResponse(res, HttpServletResponse.SC_OK, true);
		} catch (SQLException e) {
			setResponse(res, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false);
			e.printStackTrace();
		}
	}

	private void setResponse(HttpServletResponse res, int responseCode, boolean isSuccess) throws IOException {
		res.setContentType("application/json");
		res.setCharacterEncoding("UTF-8");
		res.setStatus(responseCode);

		RoomResponse response = new RoomResponse(responseCode, isSuccess);
		res.getWriter().write(jsonUtil.getJsonFromObject(response));
	}
}
