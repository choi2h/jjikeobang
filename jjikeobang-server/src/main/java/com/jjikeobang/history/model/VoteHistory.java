package com.jjikeobang.history.model;

import java.time.LocalDateTime;

public class VoteHistory {
    private Long historyId;
    private Long roomId;
    private Long memberId;
    private String nickname;
    private LocalDateTime createAt;

    public VoteHistory(Long roomId, Long memberId, String nickname, LocalDateTime createAt) {
        this.roomId = roomId;
        this.memberId = memberId;
        this.nickname = nickname;
        this.createAt = createAt;
    }

    public VoteHistory(Long historyId, Long roomId, Long memberId, String nickname, LocalDateTime createAt) {
        this.historyId = historyId;
        this.roomId = roomId;
        this.memberId = memberId;
        this.nickname = nickname;
        this.createAt = createAt;
    }

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

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setHistoryId(Long historyId) {
        this.historyId = historyId;
    }

    @Override
    public String toString() {
        return "VoteHistory{" +
                "historyId=" + historyId +
                ", roomId=" + roomId +
                ", memberId=" + memberId +
                ", nickname='" + nickname + '\'' +
                ", createAt=" + createAt +
                '}';
    }
}
