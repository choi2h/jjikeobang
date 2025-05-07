package com.jjikeobang.candidate.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.jjikeobang.candidate.model.Candidate;
import com.jjikeobang.candidate.service.CandidateService;
import com.jjikeobang.candidate.service.CandidateServiceImpl;
import com.jjikeobang.room.model.Room;
import com.jjikeobang.room.service.RoomService;
import com.jjikeobang.room.service.RoomServiceImpl;
import com.jjikeobang.util.JsonUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/candidate")
public class CandidateController extends HttpServlet{
	
    private final CandidateService candidateService;
	private final JsonUtil jsonUtil;

	public CandidateController() {
		candidateService = new CandidateServiceImpl();
		jsonUtil = JsonUtil.getInstance();
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		Room room;
		try {
			room = jsonUtil.getObjectFromJson(req.getReader(), Room.class);
			
			List<Candidate> candidates = new ArrayList<Candidate>();
			candidates = room.getCandidates();
			
			//후보자 (roomId 세팅)
			for(Candidate c : candidates) {
				c.setRoomId(room.getRoomId());
			}
			candidateService.insertCandidates(candidates);
			
			setResponse(res, HttpServletResponse.SC_OK, true);
			res.getWriter().write(jsonUtil.getJsonFromObject(candidateService.findAllByRoomId(room.getRoomId())));
			
		} catch (IOException e) {
			setResponse(res, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false);
			e.printStackTrace();
			return;
		}
		
	}
	
	private void setResponse(HttpServletResponse res, int responseCode, boolean isSuccess) throws IOException {
		res.setContentType("application/json");
		res.setCharacterEncoding("UTF-8");
		res.setStatus(responseCode);
	}
}
