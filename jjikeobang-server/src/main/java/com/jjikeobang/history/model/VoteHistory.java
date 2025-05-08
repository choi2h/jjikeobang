package com.jjikeobang.history.model;

import java.time.LocalDateTime;

public class VoteHistory {
    private Long historyId;
    private Long roomId;
    private Long memberId;
    private String nickname;
    private LocalDateTime createdAt;


    public VoteHistory() {}


    public Long getHistoryId() {
        return historyId;
    }

    public Long getRoomId() {
        return roomId;
    }

    public Long getMemberId() {
        return memberId;
    }

    public String getNickname() {
        return nickname;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setHistoryId(Long historyId) {
        this.historyId = historyId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "VoteHistory{" +
                "historyId=" + historyId +
                ", roomId=" + roomId +
                ", memberId=" + memberId +
                ", nickname='" + nickname + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
