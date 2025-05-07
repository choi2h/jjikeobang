package com.jjikeobang.vote.controller;

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

@WebServlet("/vote")
public class VoteController extends HttpServlet {
    private final MemberService memberService = new MemberServiceImpl();
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession();

        if(session == null){
            session = req.getSession(true);
            Long id = 1L;
            session.setAttribute("memberId", id);
        }

        Long memberId = (Long) session.getAttribute("memberId");
        Member member = memberService.findById(memberId);



        super.doPost(req, resp);
    }

}
