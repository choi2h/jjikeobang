package com.jjikeobang.vote.controller;


import com.jjikeobang.candidate.model.Candidate;
import com.jjikeobang.candidate.service.CandidateRoomService;
import com.jjikeobang.candidate.service.CandidateRoomServiceImpl;
import com.jjikeobang.vote.model.CandidateInfo;
import com.jjikeobang.vote.model.VoteCounting;
import com.jjikeobang.vote.model.VoteCountingMap;
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
    protected void doGet(HttpServletRequest req, HttpServletResponse resp){
        String roomIdParam = req.getParameter("roomId");

        if (roomIdParam == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        long roomId;
        try {
            roomId = Long.parseLong(roomIdParam);
        } catch (NumberFormatException e) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }

        List<Candidate> room = candidateRoomService.findAllByRoomId(roomId);
        List<CandidateInfo> roomInfo = new ArrayList<>();
        for (Candidate candidate : room) {
            roomInfo.add(new CandidateInfo(candidate.getCandidateId()));
        }
        //기권표 후보
        CandidateInfo abstain = new CandidateInfo(-1L);
        roomInfo.add(abstain);

        VoteCounting voteCounting = VoteCounting.of(roomInfo);

        VoteCountingMap.put(roomId, voteCounting);

        resp.setStatus(HttpServletResponse.SC_OK);
    }

}
