package com.jjikeobang.member.controller;

import com.jjikeobang.member.model.Member;
import com.jjikeobang.member.service.MemberServiceImpl;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@WebServlet("/member")
public class MemberController extends HttpServlet {

    private final MemberServiceImpl memberService;

    public MemberController() {
        this.memberService = new MemberServiceImpl();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        List<Member> members = memberService.selectAllMember();
        for (Member member : members) {
            resp.getWriter().println(member);
        }
    }
}
