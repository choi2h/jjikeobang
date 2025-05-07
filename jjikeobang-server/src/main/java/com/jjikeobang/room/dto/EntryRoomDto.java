package com.jjikeobang.room.dto;

public class EntryRoomDto {
    private long roomId;
    private String name;
    private int voteDuration;
    private String entryCode;
    private int maxParticipantCount;
    private int totalEntryCount;
    private long createMemberId;
    private String userNickname;

    public long getRoomId() {
        return roomId;
    }

    public void setRoomId(long roomId) {
        this.roomId = roomId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getVoteDuration() {
        return voteDuration;
    }

    public void setVoteDuration(int voteDuration) {
        this.voteDuration = voteDuration;
    }

    public String getEntryCode() {
        return entryCode;
    }

    public void setEntryCode(String entryCode) {
        this.entryCode = entryCode;
    }

    public int getMaxParticipantCount() {
        return maxParticipantCount;
    }

    public void setMaxParticipantCount(int maxParticipantCount) {
        this.maxParticipantCount = maxParticipantCount;
    }

    public int getTotalEntryCount() {
        return totalEntryCount;
    }

    public void setTotalEntryCount(int totalEntryCount) {
        this.totalEntryCount = totalEntryCount;
    }

    public String getUserNickname() {
        return userNickname;
    }

    public void setUserNickname(String userNickname) {
        this.userNickname = userNickname;
    }

    public long getCreateMemberId() {
        return createMemberId;
    }

    public void setCreateMemberId(long createMemberId) {
        this.createMemberId = createMemberId;
    }

    @Override
    public String toString() {
        return "RoomInfoDto{" +
                "roomId=" + roomId +
                ", name='" + name + '\'' +
                ", voteDuration=" + voteDuration +
                ", entryCode='" + entryCode + '\'' +
                ", maxParticipantCount=" + maxParticipantCount +
                ", totalEntryCount=" + totalEntryCount +
                ", userNickname='" + userNickname + '\'' +
                ", createMemberId=" + createMemberId +
                '}';
    }
}
