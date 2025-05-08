package com.jjikeobang.room.controller;

import com.jjikeobang.common.Response;
import com.jjikeobang.room.dto.EntryRoomDto;

public class RoomResponse extends Response {
    private final boolean isSuccess;
    private EntryRoomDto roomInfo;

    public RoomResponse(int statusCode, boolean isSuccess) {
        super(statusCode);
        this.isSuccess = isSuccess;
    }

    public RoomResponse(int statusCode, boolean isSuccess, EntryRoomDto roomInfo) {
        super(statusCode);
        this.isSuccess = isSuccess;
        this.roomInfo = roomInfo;

    }

    public boolean isSuccess() {
        return isSuccess;
    }

    public EntryRoomDto getRoomInfo() {
        return roomInfo;
    }
}
