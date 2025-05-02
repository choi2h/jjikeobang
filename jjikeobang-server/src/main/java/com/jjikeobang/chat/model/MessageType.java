package com.jjikeobang.chat.model;

public enum MessageType {
    ENTER, MESSAGE, LEAVE;

    public static MessageType getType(String type) {
        for(MessageType messageType : MessageType.values()) {
            if(messageType.toString().equals(type)) {
                return messageType;
            }
        }

        return null;
    }
}
