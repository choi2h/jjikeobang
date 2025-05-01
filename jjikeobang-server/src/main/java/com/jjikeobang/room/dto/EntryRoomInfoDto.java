package com.jjikeobang.room.dto;

import java.util.List;

public class EntryRoomInfoDto {
    private String roomTitle;
    private int maxParticipants;
    private int currentParticipants;
    private List<CandidateDto> candidates;
    private boolean hasVoted;
    private String userNickname;

    public String getRoomTitle() {
        return roomTitle;
    }

    public void setRoomTitle(String roomTitle) {
        this.roomTitle = roomTitle;
    }

    public int getMaxParticipants() {
        return maxParticipants;
    }

    public void setMaxParticipants(int maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

    public int getCurrentParticipants() {
        return currentParticipants;
    }

    public void setCurrentParticipants(int currentParticipants) {
        this.currentParticipants = currentParticipants;
    }

    public List<CandidateDto> getCandidates() {
        return candidates;
    }

    public void setCandidates(List<CandidateDto> candidates) {
        this.candidates = candidates;
    }

    public boolean isHasVoted() {
        return hasVoted;
    }

    public void setHasVoted(boolean hasVoted) {
        this.hasVoted = hasVoted;
    }

    public String getUserNickname() {
        return userNickname;
    }

    public void setUserNickname(String userNickname) {
        this.userNickname = userNickname;
    }

    @Override
    public String toString() {
        return "EntryRoomInfoDto{" +
                "roomTitle='" + roomTitle + '\'' +
                ", maxParticipants=" + maxParticipants +
                ", currentParticipants=" + currentParticipants +
                ", candidates=" + candidates +
                ", hasVoted=" + hasVoted +
                ", userNickname='" + userNickname + '\'' +
                '}';
    }
}
