package com.jjikeobang.vote.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.*;

@WebServlet
public class CountdownController extends HttpServlet {
    private static final Map<Long, ScheduledFuture<?>> roomTimers = new ConcurrentHashMap<>();
    private static final Map<Long, Integer> durationMap = new ConcurrentHashMap<>();
    private static final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(10);

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String roomIdParam = request.getParameter("roomId");
        String durationParam = request.getParameter("duration");

        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        if (roomIdParam == null || durationParam == null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.println("Missing parameters");
            return;
        }

        long roomId;
        int duration;

        try{
            roomId = Long.parseLong(roomIdParam);
        }catch (NumberFormatException e){
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.println("CountDownNumberFormat Error");
            return;
        }


        try {
            duration = Integer.parseInt(durationParam);
        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.println("Invalid duration format");
            return;
        }

        if (roomTimers.containsKey(roomId)) {
            out.println("Timer already running for roomId: " + roomId);
            return;
        }

        durationMap.put(roomId, duration);

        ScheduledFuture<?> future = scheduler.scheduleAtFixedRate(() -> {
            int timeLeft = durationMap.get(roomId);
            if (timeLeft <= 1) {
                durationMap.remove(roomId);
                roomTimers.remove(roomId).cancel(false);
                System.out.println("Countdown finished for roomId: " + roomId);
            } else {
                durationMap.put(roomId, timeLeft - 1);
                Map<String,Object> msg = new HashMap<>();
                msg.put("timeRemaining", timeLeft);
                VoteSocketController.broadcast(roomId, msg, "time");
            }
        }, 0, 1, TimeUnit.SECONDS);

        roomTimers.put(roomId, future);
        out.println("Started countdown for roomId: " + roomId + ", duration: " + duration + "s");
    }
}