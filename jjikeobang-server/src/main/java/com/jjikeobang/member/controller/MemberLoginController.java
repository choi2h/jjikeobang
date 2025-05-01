package com.jjikeobang.member.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jjikeobang.member.model.Member;
import com.jjikeobang.member.service.MemberServiceImpl;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/member/login")
public class MemberLoginController extends HttpServlet {

    private final MemberServiceImpl memberService;

    public MemberLoginController() {
        this.memberService = new MemberServiceImpl();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper om = new ObjectMapper();

        Map<String,Object> result = new HashMap<>();

        BufferedReader reader = req.getReader();
        StringBuilder sb = new StringBuilder();

        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        String requestBody = sb.toString();

        Map<String, Object> readData = om.readValue(requestBody, Map.class);

        String userId = (String) readData.get("userId");
        String userPw = (String) readData.get("userPw");


        boolean isLoggedIn = memberService.checkUserInfo(userId, userPw);
        result.put("login_status", isLoggedIn);

        resp.setContentType("application/json; utf-8");
        resp.getWriter().println(result);
        //로그인 성공 시 세션 저장
        if(isLoggedIn){
            HttpSession session = req.getSession();
            Member currentMember = memberService.findByLoginId(userId);
            session.setAttribute("memberId",currentMember.getId());
        }
    }
}
