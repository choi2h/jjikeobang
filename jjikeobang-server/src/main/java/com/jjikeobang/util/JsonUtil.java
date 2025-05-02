package com.jjikeobang.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.IOException;
import java.io.Reader;
import java.text.SimpleDateFormat;

public class JsonUtil {

    private static JsonUtil jsonUtil;

    // 싱글톤 객체
    public static JsonUtil getInstance() {
        synchronized (JsonUtil.class) {
            if(jsonUtil == null) {
                jsonUtil = new JsonUtil();
            }
        }

        return jsonUtil;
    }

    private static ObjectMapper objectMapper;

    // 객체 생성은 오로지 객체 내부에서 하나만 만들기 위해 private 지정
    private JsonUtil() {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
    }

    public <T> T getObjectFromJson(Reader json, Class<T> classType) throws IOException {
        return objectMapper.readValue(json, classType);
    }

    public <T> T getObjectFromJson(String json, Class<T> classType) throws IOException {
        return objectMapper.readValue(json, classType);
    }

    public String getJsonFromObject(Object object) throws IOException {
        return objectMapper.writeValueAsString(object);
    }
}
