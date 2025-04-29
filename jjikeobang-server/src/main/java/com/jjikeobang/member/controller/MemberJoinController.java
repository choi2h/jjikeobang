package com.jjikeobang.member.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/member/join")
public class MemberJoinController extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String userPw = req.getParameter("userPw");
        String comparePw = req.getParameter("comparePw");

        if (!userPw.equals(comparePw)) {
            resp.setContentType("text/plain; charset=UTF-8");
            resp.getWriter().write("비밀번호가 일치하지 않습니다.");
        }

    }
}
