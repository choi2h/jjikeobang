package com.jjikeobang.room.controller;

import com.jjikeobang.room.model.Room;
import com.jjikeobang.room.service.RoomService;
import com.jjikeobang.room.service.RoomServiceImpl;
import com.jjikeobang.util.JsonUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@WebServlet("/room/check-admin")
public class CheckAdminController extends HttpServlet {
    private final RoomService roomService = new RoomServiceImpl();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        JsonUtil jsonUtil = JsonUtil.getInstance();
        Map<String, Object> responseMap = new HashMap<>();
        HttpSession session = req.getSession(true);

        long memberId = (Long) session.getAttribute("memberId");
        long roomId = Long.parseLong(req.getParameter("roomId"));

        Room room = roomService.findById(roomId);

        responseMap.put("status",200);

        if(memberId == room.getCreateMemberId()){
            responseMap.put("isAdmin", true);
        }else{
            responseMap.put("isAdmin",false);
        }

        try{
            String result = jsonUtil.getJsonFromObject(responseMap);
            resp.getWriter().write(result);
            resp.getWriter().flush();
        }catch (IOException e){
            e.printStackTrace();
        }
    }
}
