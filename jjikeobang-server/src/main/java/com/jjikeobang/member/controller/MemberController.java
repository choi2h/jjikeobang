package com.jjikeobang.member.controller;

import com.jjikeobang.member.model.Member;
import com.jjikeobang.member.service.MemberServiceImpl;
import com.jjikeobang.room.model.Room;
import com.jjikeobang.util.JsonUtil;
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
    private final JsonUtil jsonUtil;

    public MemberController() {
        this.memberService = new MemberServiceImpl();
        this.jsonUtil = JsonUtil.getInstance();
    }

    @Override
    public void init() throws ServletException {
        System.out.println("@@@@@@@@@@@ - Init member controller.");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<Member> members = memberService.selectAllMember();
        for (Member member : members) {
            resp.getWriter().println(member);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Post member controller." + req.toString());
        Room room = null;
        try {
             room = jsonUtil.getObjectFromJson(req.getReader(), Room.class);
        } catch(Exception e) {
            e.printStackTrace();
        }
        System.out.println(room.toString());
    }
}
