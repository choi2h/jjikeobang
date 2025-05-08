package com.jjikeobang.vote.controller;

import java.io.IOException;
import java.sql.DatabaseMetaData;
import java.util.Map;

import com.jjikeobang.util.DatabaseUtil;
import com.jjikeobang.util.JsonUtil;
import com.jjikeobang.vote.service.VoteResultService;
import com.jjikeobang.vote.service.VoteResultServiceImpl;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/vote/result")
public class VoteResultController extends HttpServlet{
	
	private final VoteResultService voteResultService;
	private final JsonUtil jsonUtil;
	
	public VoteResultController() {
		this.voteResultService = new VoteResultServiceImpl();
		jsonUtil = JsonUtil.getInstance();
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		
		try {
			long roomId = Long.parseLong(req.getParameter("roomId"));
			
			Map<String, Object> voteResult = voteResultService.getVoteResult(roomId);
			setResponse(res, HttpServletResponse.SC_OK, true);
			
			res.getWriter().write(jsonUtil.getJsonFromObject(voteResult));
		}catch (Exception e) {
			setResponse(res, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false);
			e.printStackTrace();
		}
	}
	
	private void setResponse(HttpServletResponse res, int responseCode, boolean isSuccess) throws IOException {
		res.setContentType("application/json");
		res.setCharacterEncoding("UTF-8");
		res.setStatus(responseCode);
	}
}
