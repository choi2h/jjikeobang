package com.jjikeobang.chat.controller;


import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/chat")
public class ChatController extends HttpServlet {

    @Override
    public void init() throws ServletException {
        System.out.println("init chat controller!");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().println("Hello,chat controller!");
    }
}
