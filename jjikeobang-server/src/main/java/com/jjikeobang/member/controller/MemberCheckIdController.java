package com.jjikeobang.member.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jjikeobang.member.service.MemberService;
import com.jjikeobang.member.service.MemberServiceImpl;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/member/check-id")
public class MemberCheckIdController extends HttpServlet {
    private final MemberService memberService = new MemberServiceImpl();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper om = new ObjectMapper();
        Map<String, Object> result = new HashMap<>();

        String userId = req.getParameter("userId");
        boolean isDuplicated = memberService.isDuplicatedId(userId);

        result.put("isDuplicated", isDuplicated);

        resp.setContentType("application/json; utf-8");
        resp.getWriter().println(om.writeValueAsString(result));

    }
}
