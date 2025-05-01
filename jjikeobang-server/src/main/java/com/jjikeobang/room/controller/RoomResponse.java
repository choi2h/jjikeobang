package com.jjikeobang.room.controller;

import com.jjikeobang.common.Response;

public class RoomResponse extends Response {
    boolean isSuccess;

    public RoomResponse(int statusCode, boolean isSuccess) {
        super(statusCode);
        this.isSuccess = isSuccess;
    }

    public boolean isSuccess() {
        return isSuccess;
    }
}
