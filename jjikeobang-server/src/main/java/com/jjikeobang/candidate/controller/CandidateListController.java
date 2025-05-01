package com.jjikeobang.candidate.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import com.jjikeobang.candidate.model.Candidate;
import com.jjikeobang.candidate.service.CandidateRoomService;
import com.jjikeobang.candidate.service.CandidateRoomServiceImpl;


@WebServlet("/candidate")  //요청 예시: /room/candidate?roomId=3 
public class CandidateListController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final CandidateRoomService candidateRoomService = new CandidateRoomServiceImpl();
     
	 @Override
	 protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 
		 long roomId = Long.parseLong(request.getParameter("roomId"));
		 
		 List<Candidate> candidates = candidateRoomService.findAllByRoomId(roomId);
		 
	     response.setContentType("application/json");
	     response.setCharacterEncoding("UTF-8");
	       
	     //jackson
	     ObjectMapper mapper = new ObjectMapper();
	     mapper.registerModule(new JavaTimeModule());
	     String json = mapper.writeValueAsString(candidates);
	     response.getWriter().write(json);
		 
	}


}
