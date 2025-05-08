package com.jjikeobang.history.controller;

import com.jjikeobang.history.dto.VoteHistoryDto;
import com.jjikeobang.history.service.VoteHistoryService;
import com.jjikeobang.history.service.VoteHistoryServiceImpl;
import com.jjikeobang.util.JsonUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/vote/history")
public class VoteHistoryController extends HttpServlet {

    private VoteHistoryService voteHistoryService;
    private JsonUtil jsonUtil;

    public VoteHistoryController() {
        this.voteHistoryService = new VoteHistoryServiceImpl();
        this.jsonUtil = JsonUtil.getInstance();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        long memberId = Integer.parseInt(req.getParameter("memberId"));

        try {
            List<VoteHistoryDto> histories = voteHistoryService.findByMemberId(memberId);
            setResponse(res, HttpServletResponse.SC_OK, histories);
        } catch(IOException e) {
            System.out.println("Failed to get vote history.");
            e.printStackTrace();
            setResponse(res, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, null);
        }
    }

    private void setResponse(HttpServletResponse res, int statusCode, Object body) throws IOException {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        res.setStatus(statusCode);

        if(body == null) return;
        VoteHistoryResponse response = new VoteHistoryResponse(statusCode, body);
        res.getWriter().write(jsonUtil.getJsonFromObject(response));
    }
}
