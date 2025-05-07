package com.jjikeobang.member.controller;

import com.jjikeobang.member.model.Member;
import com.jjikeobang.member.service.MemberServiceImpl;
import com.jjikeobang.util.JsonUtil;
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
        Map<String,Object> result = new HashMap<>();

        BufferedReader reader = req.getReader();
        Map<String, Object> readData = JsonUtil.getInstance().getObjectFromJson(reader, Map.class);

        String userId = (String) readData.get("userId");
        String userPw = (String) readData.get("userPw");

        boolean isLoggedIn = memberService.checkUserInfo(userId, userPw);
        result.put("login_status", isLoggedIn);

        resp.setContentType("application/json; utf-8");
        resp.getWriter().println(JsonUtil.getInstance().getJsonFromObject(result));

        // 로그인 성공 시 세션 저장
        if (isLoggedIn) {
            HttpSession session = req.getSession();
            Member currentMember = memberService.findByLoginId(userId);
            session.setAttribute("memberId", currentMember.getId());
            System.out.println(currentMember.getId());
        }
    }
}
