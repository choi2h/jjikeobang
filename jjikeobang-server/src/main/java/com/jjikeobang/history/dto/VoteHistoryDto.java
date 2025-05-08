package com.jjikeobang.history.dto;

import java.time.LocalDateTime;
import java.util.List;

public class VoteHistoryDto {
    private Long historyId;
    private String roomTitle;
    private int totalEntryCount;
    private LocalDateTime createdAt;
    private List<HistoryCandidateDto> candidateInfos;

    public Long getHistoryId() {
        return historyId;
    }

    public void setHistoryId(Long historyId) {
        this.historyId = historyId;
    }

    public String getRoomTitle() {
        return roomTitle;
    }

    public void setRoomTitle(String roomTitle) {
        this.roomTitle = roomTitle;
    }

    public int getTotalEntryCount() {
        return totalEntryCount;
    }

    public void setTotalEntryCount(int totalEntryCount) {
        this.totalEntryCount = totalEntryCount;
    }

    public LocalDateTime getCreatedAt(LocalDateTime createdAt) {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<HistoryCandidateDto> getCandidateInfos() {
        return candidateInfos;
    }

    public void setCandidateInfos(List<HistoryCandidateDto> candidateInfos) {
        this.candidateInfos = candidateInfos;
    }

    @Override
    public String toString() {
        return "VoteHistoryDto{" +
                "historyId=" + historyId +
                ", roomTitle='" + roomTitle + '\'' +
                ", totalEntryCount=" + totalEntryCount +
                ", createdAt=" + createdAt +
                ", candidateInfos=" + candidateInfos +
                '}';
    }
}
