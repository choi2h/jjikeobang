package com.jjikeobang.common;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public abstract class Response {
    private final int statusCode;
    private Object data;

    public Response(int statusCode) {
        this.statusCode = statusCode;
    }

    public Response(int statusCode, Object data) {
        this.statusCode = statusCode;
        this.data = data;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public Object getData() {
        return data;
    }
}
