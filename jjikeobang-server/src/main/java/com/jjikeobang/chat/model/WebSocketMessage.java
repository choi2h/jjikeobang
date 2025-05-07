package com.jjikeobang.chat.model;

import java.time.LocalDateTime;

public class WebSocketMessage {
    MessageType type;
    String name;
    String text;
    LocalDateTime dateTime;

    public WebSocketMessage() {}

    public WebSocketMessage(MessageType type, String name, String text) {
        this.type = type;
        this.name = name;
        this.text = text;
        this.dateTime = LocalDateTime.now();
    }

    public void setType(String type) {
        this.type = MessageType.getType(type);
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public MessageType getType() {
        return type;
    }

    public String getName() {
        return name;
    }

    public String getText() {
        return text;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    @Override
    public String toString() {
        return "WebSocketMessage{" +
                "type=" + type +
                ", name='" + name + '\'' +
                ", text='" + text + '\'' +
                ", dateTime=" + dateTime +
                '}';
    }
}
