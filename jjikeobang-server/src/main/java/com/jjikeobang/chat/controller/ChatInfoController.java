package com.jjikeobang.chat.controller;

import com.jjikeobang.chat.service.ChatConnectionServiceImpl;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/chat")
public class ChatInfoController extends HttpServlet {

    ChatConnectionServiceImpl chatConnectionService;

    public ChatInfoController() {
        chatConnectionService = ChatConnectionServiceImpl.getInstance();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) {
        Long roomId = Long.valueOf(req.getParameter("roomId"));
        try {
            chatConnectionService.addRoom(roomId);
        } catch (RuntimeException e) {
            res.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        }

        res.setStatus(HttpServletResponse.SC_OK);
    }
}
