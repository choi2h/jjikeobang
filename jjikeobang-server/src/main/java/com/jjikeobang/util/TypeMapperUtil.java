package com.jjikeobang.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class TypeMapperUtil {
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public static LocalDateTime stringToLocalDateTime(String str) {
        return LocalDateTime.parse(str, DATE_TIME_FORMATTER);
    }
}
