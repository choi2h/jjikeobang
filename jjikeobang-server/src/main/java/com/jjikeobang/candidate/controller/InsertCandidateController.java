package com.jjikeobang.candidate.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.jjikeobang.candidate.model.Candidate;
import com.jjikeobang.candidate.service.CandidateRoomService;
import com.jjikeobang.candidate.service.CandidateRoomServiceImpl;
import com.jjikeobang.common.Response;
import com.jjikeobang.util.JsonUtil;


@WebServlet("/candidates") //요청 예시: /candidate?roomId=3 
public class InsertCandidateController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final CandidateRoomService candidateRoomService = new CandidateRoomServiceImpl();
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		 try {
			
			List<Candidate> candidates = JsonUtil.getInstance().getObjectFromJson(request.getReader(), new TypeReference<List<Candidate>>() {});
			
			//유효성 검사
			if(candidates==null || candidates.size()<1) {
				throw new IllegalArgumentException("후보자 목록이 비어있습니다.");
			}
					 
			for(Candidate candidate : candidates) {
				candidateRoomService.insertAllByRoomId(candidate);
			}
			
			Response success = new Response(HttpServletResponse.SC_OK) {};
			response.getWriter().write(JsonUtil.getInstance().getJsonFromObject(success));
			 
		 }catch(IllegalArgumentException e) {
			 Response error = new Response(HttpServletResponse.SC_BAD_REQUEST,e.getMessage()){};
			 response.getWriter().write(JsonUtil.getInstance().getJsonFromObject(error));
		 
		 }catch(Exception e) {
			 Response error = new Response(HttpServletResponse.SC_BAD_REQUEST) {};
			 response.getWriter().write(JsonUtil.getInstance().getJsonFromObject(error));
			 return;
		 }
	
	}

}
