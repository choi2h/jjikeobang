package com.jjikeobang.history.dto;

import java.time.LocalDateTime;

public class VoteHistoryDto {
    private Long history_id;
    private Long member_id;
    private Long room_id;
    private LocalDateTime created_at;
    private String name;

    public Long getHistory_id() {
        return history_id;
    }

    public void setHistory_id(Long history_id) {
        this.history_id = history_id;
    }

    public Long getMember_id() {
        return member_id;
    }

    public void setMember_id(Long member_id) {
        this.member_id = member_id;
    }

    public Long getRoom_id() {
        return room_id;
    }

    public void setRoom_id(Long room_id) {
        this.room_id = room_id;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @Override
    public String toString() {
        return "VoteHistoryDto{" +
                "history_id=" + history_id +
                ", member_id=" + member_id +
                ", room_id=" + room_id +
                ", created_at=" + created_at +
                ", name='" + name + '\'' +
                '}';
    }
}
