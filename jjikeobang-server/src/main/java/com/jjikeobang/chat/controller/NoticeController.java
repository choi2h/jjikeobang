package com.jjikeobang.chat.controller;

import com.jjikeobang.chat.model.MessageType;
import com.jjikeobang.chat.model.SendMessage;
import com.jjikeobang.chat.service.SendMessageService;
import com.jjikeobang.chat.service.SendMessageServiceImpl;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/notice/vote/start")
public class NoticeController extends HttpServlet {
    private final SendMessageService sendMessageService;

    public NoticeController() {
        sendMessageService = SendMessageServiceImpl.getInstance();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) {
        Long roomId = Long.valueOf(req.getParameter("roomId"));
        System.out.println("Notice start vote for room. roomId = " + roomId);

        try {
            sendMessageService.broadcast(roomId, MessageType.VOTE_START, "SERVER", SendMessage.START_VOTE);
        } catch (RuntimeException e) {
            res.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }

        res.setStatus(HttpServletResponse.SC_OK);
    }
}
