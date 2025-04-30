package com.jjikeobang.member.controller;

import com.jjikeobang.member.model.JoinMemberDTO;
import com.jjikeobang.member.service.MemberService;
import com.jjikeobang.member.service.MemberServiceImpl;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/member/join")
public class MemberJoinController extends HttpServlet {
    private final MemberService memberService = new MemberServiceImpl();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String userId = req.getParameter("userId");
        String name = req.getParameter("name");
        String userPw = req.getParameter("userPw");
        String comparePw = req.getParameter("comparePw");

        // 비밀번호 불일치
        if (!userPw.equals(comparePw)) {
            printAlert(resp, "비밀번호가 일치하지 않습니다.");
            return;
        }
        // 아이디 중복 통과 X
        if(memberService.isDuplicatedId(userId)){
            printAlert(resp, "아이디를 확인해 주세요.");
            return;
        }

        memberService.putMember(new JoinMemberDTO(userId,userPw,name));

    }

    private static void printAlert(HttpServletResponse resp, String message) throws IOException {
        resp.setContentType("text/html; charset=UTF-8");
        resp.getWriter().println(
                "<script>alert('"+message+"'); location.href='"+"/signup"+"';</script>");
    }
}
