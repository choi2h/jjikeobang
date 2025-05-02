package com.jjikeobang.member.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jjikeobang.member.model.Member;
import com.jjikeobang.member.service.MemberService;
import com.jjikeobang.member.service.MemberServiceImpl;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/profile")
public class ProfileController extends HttpServlet {
    private final MemberService memberService = new MemberServiceImpl();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession();
        ObjectMapper om = new ObjectMapper();
        Map<String, Object> result = new HashMap<>();

        String memberId = (String) session.getAttribute("memberId");

        if(session.getAttribute("memberId") != null){
            Member member = memberService.findById(Integer.parseInt(memberId));
            result.put("is_logged_in",true);
            result.put("name", member.getName());
        }else{
            result.put("is_logged_in",false);
        }

        resp.getWriter().println(om.writeValueAsString(result));
    }
}
