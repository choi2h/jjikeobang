package com.jjikeobang.member.controller;

import com.jjikeobang.member.model.Member;
import com.jjikeobang.member.service.MemberService;
import com.jjikeobang.member.service.MemberServiceImpl;
import com.jjikeobang.util.JsonUtil;
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
        Map<String, Object> result = new HashMap<>();

        Long memberId = (Long) session.getAttribute("memberId");

        if (memberId != null) {
            Member member = memberService.findById(memberId.intValue());
            result.put("is_logged_in", true);
            result.put("name", member.getName());
        } else {
            result.put("is_logged_in", false);
        }

        resp.setContentType("application/json; utf-8");
        resp.getWriter().println(JsonUtil.getInstance().getJsonFromObject(result));
    }
}
