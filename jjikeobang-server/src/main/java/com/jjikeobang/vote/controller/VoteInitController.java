package com.jjikeobang.vote.controller;


import com.jjikeobang.candidate.model.Candidate;
import com.jjikeobang.candidate.service.CandidateRoomService;
import com.jjikeobang.candidate.service.CandidateRoomServiceImpl;
import com.jjikeobang.vote.model.CandidateInfo;
import com.jjikeobang.vote.model.VoteResult;
import com.jjikeobang.vote.model.VoteResultMap;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/vote-start")
public class VoteInitController extends HttpServlet {
    private final CandidateRoomService candidateRoomService = new CandidateRoomServiceImpl();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        long roomId = Long.parseLong(req.getParameter("roomId"));

        List<Candidate> room = candidateRoomService.findAllByRoomId(roomId);
        List<CandidateInfo> roomInfo = new ArrayList<>();
        for (Candidate candidate : room) {
            roomInfo.add(new CandidateInfo(candidate.getCandidateId()));
        }
        VoteResult voteResult = VoteResult.of(roomInfo);

        VoteResultMap.put(roomId, voteResult);
    }

}
