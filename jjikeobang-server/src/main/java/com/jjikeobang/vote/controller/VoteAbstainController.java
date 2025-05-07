package com.jjikeobang.vote.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.jjikeobang.candidate.model.Candidate;
import com.jjikeobang.room.model.Room;
import com.jjikeobang.room.service.RoomService;
import com.jjikeobang.room.service.RoomServiceImpl;
import com.jjikeobang.util.JsonUtil;
import com.jjikeobang.vote.model.VoteHistory;
import com.jjikeobang.vote.service.VoteService;
import com.jjikeobang.vote.service.VoteServiceImpl;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/vote/abstain")
public class VoteAbstainController extends HttpServlet{
	
	private final RoomService roomService;
	private final VoteService voteService;
	private final JsonUtil jsonUtil;
	
	public VoteAbstainController() {
		this.roomService = new RoomServiceImpl();
		this.voteService = new VoteServiceImpl();
		jsonUtil = JsonUtil.getInstance();
	}
	
	
	//기권하기
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		long roomId = Long.parseLong(req.getParameter("roomId"));
		
		HttpSession session = req.getSession();
		Long memberId = (Long) session.getAttribute("memberId");
		
		// 투표 로그 저장
		VoteHistory voteHistory = new VoteHistory();
		voteHistory.setRoomId(roomId);
		voteHistory.setMemberId(memberId);
		
		voteService.insertVoteHistory(voteHistory);
		
		// 투표 종료 여부 확인 : 전체 인원이 투표 완료 했는지
		Room roomInfo = roomService.findById(roomId);
		int totEntCnt = roomInfo.getTotalEntryCount();
		int totVoteCnt = voteService.selectTotalVoteCount(roomId);
		boolean isEnd = false;
		
		if(totEntCnt <= totVoteCnt) {
			// 투표 종료
			System.out.println("투표 종료");
			isEnd = true;
		}
		
		setResponse(res, HttpServletResponse.SC_OK, true);
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("isEnd", isEnd);
		result.put("totEntCnt", totEntCnt);
		result.put("voteCount", totVoteCnt);
		res.getWriter().write(jsonUtil.getJsonFromObject(result)); // 투표 종료 여부, 총 투표 수
	}
	
	private void setResponse(HttpServletResponse res, int responseCode, boolean isSuccess) throws IOException {
		res.setContentType("application/json");
		res.setCharacterEncoding("UTF-8");
		res.setStatus(responseCode);
	}
}
