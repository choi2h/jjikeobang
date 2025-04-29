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

@WebServlet(urlPatterns = {"/member/check-id","/member/join","/member/login"})
public class MemberController extends HttpServlet {

    private final MemberServiceImpl memberService;

    public MemberController() {
        this.memberService = new MemberServiceImpl();
    }

    // 아이디 중복 검사
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<Member> members = memberService.selectAllMember();

        super.doGet(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String urlPath= req.getServletPath();
        switch(urlPath){
            case "member/join":
                // 회원가입 기능
                String userPw = req.getParameter("userPw");
                String comparePw = req.getParameter("comparePw");

                if (!userPw.equals(comparePw)) {
                    resp.setContentType("text/plain; charset=UTF-8");
                    resp.getWriter().write("비밀번호가 일치하지 않습니다.");
                    return;
                }

                break;
            case "member/login":
                // 로그인 기능

                break;
            default:
                resp.sendError(404);
        }
        super.doPost(req, resp);
    }
}
