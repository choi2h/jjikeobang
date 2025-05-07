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
import com.jjikeobang.candidate.service.CandidateService;
import com.jjikeobang.candidate.service.CandidateServiceImpl;
import com.jjikeobang.common.Response;
import com.jjikeobang.util.JsonUtil;


@WebServlet("/candidates")  //요청 예시: /room/candidate?roomId=3 
public class CandidateListController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final CandidateService candidateRoomService = new CandidateServiceImpl();
     
	 @Override
	 protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 response.setContentType("application/json");
		 response.setCharacterEncoding("UTF-8");
		 
		 //유효성 검사 (비어있을 때)
		 String roomIdParameter = request.getParameter("roomId");
		 
		 if(roomIdParameter==null||roomIdParameter.isBlank()) {
			 Response error = new Response(HttpServletResponse.SC_BAD_REQUEST) {}; //에러 반환하는 응답 객체 생성
			 response.getWriter().write(JsonUtil.getInstance().getJsonFromObject(error));
			 return;
		 }
		 
		 //유효성 검사 (숫자가 아닐 때)
		 long roomId;
		 try {
			 roomId=Long.parseLong(roomIdParameter);
		 }catch(NumberFormatException e) {
			 Response error = new Response(HttpServletResponse.SC_BAD_REQUEST) {};
			 response.getWriter().write(JsonUtil.getInstance().getJsonFromObject(error));
			 return;
		 }
		 
		 
		 List<Candidate> candidates = candidateRoomService.findAllByRoomId(roomId);

		 CandidateResponse success = new CandidateResponse(HttpServletResponse.SC_OK,candidates) {};
		 String json = JsonUtil.getInstance().getJsonFromObject(success); 
		 response.getWriter().write(json);
		 
	}


}
