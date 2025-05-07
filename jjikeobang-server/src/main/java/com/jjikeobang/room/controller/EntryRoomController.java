package com.jjikeobang.room.controller;

import com.jjikeobang.room.dto.EntryRoomDto;
import com.jjikeobang.room.service.RoomService;
import com.jjikeobang.room.service.RoomServiceImpl;
import com.jjikeobang.util.JsonUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/room/enter")
public class EntryRoomController extends HttpServlet {
    private final RoomService roomService;
    private final JsonUtil jsonUtil;

    public EntryRoomController() {
        this.roomService = new RoomServiceImpl();
        this.jsonUtil = JsonUtil.getInstance();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        String entryCode = req.getParameter("entryCode");

        try {
            EntryRoomDto dto = roomService.findByEntryCode(entryCode);
            System.out.println("Get entryRoomDto: " + dto);
            setResponse(res, HttpServletResponse.SC_OK, true, dto);
        } catch (RuntimeException e) {
            e.printStackTrace();
            setResponse(res, HttpServletResponse.SC_BAD_REQUEST, false, null);
        } catch (Exception e) {
            e.printStackTrace();
            setResponse(res, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, null);
        }
    }

    private void setResponse(HttpServletResponse res, int responseCode, boolean isSuccess, Object roomInfo) throws IOException {
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        res.setStatus(responseCode);
        RoomResponse roomResponse = new RoomResponse(responseCode, isSuccess, roomInfo);
        res.getWriter().write(jsonUtil.getJsonFromObject(roomResponse));
    }
}
