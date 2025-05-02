package com.jjikeobang.member.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jjikeobang.member.model.JoinMemberDTO;
import com.jjikeobang.member.service.MemberService;
import com.jjikeobang.member.service.MemberServiceImpl;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/member/join")
public class MemberJoinController extends HttpServlet {
    private final MemberService memberService = new MemberServiceImpl();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ObjectMapper om = new ObjectMapper();

        BufferedReader reader = req.getReader();
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }
        String requestBody = sb.toString();

        Map<String, Object> requestMap = om.readValue(requestBody, Map.class);

        String name = (String) requestMap.get("name");
        String userId = (String) requestMap.get("userId");
        String userPw = (String) requestMap.get("userPw");

        Map<String, String> resultMap = new HashMap<>();

        // 아이디 중복 통과 X
        if(memberService.checkIfDuplicated(userId)){
            resultMap.put("join_status","error");
            resultMap.put("message","아이디 중복 여부를 확인해 주세요.");

            resp.setContentType("application/json; utf-8");
            resp.getWriter().println(om.writeValueAsString(resultMap));
            return;
        }

        memberService.putMember(new JoinMemberDTO(userId,userPw,name));
        resultMap.put("join_status", "success");
        resp.setContentType("application/json; utf-8");
        resp.getWriter().println(om.writeValueAsString(resultMap));

    }
}
