package com.jjikeobang.room.model;

import java.time.LocalDateTime;
import java.util.List;

public class Room {
	
	private long roomId; 
	private String name;
	private int maxParticipant;
	private int voteDuration;
	private String entryCode;
	private long createMemberId;
	private LocalDateTime createdAt;
	private int totalEntryCount;
	private String voteStatus;
	
	public Room() {}
	
	public Room(long roomId, String name, int maxParticipant, int voteDuration, String entryCode, long createMemberId,
			int totalEntryCount) {
		super();
		this.roomId = roomId;
		this.name = name;
		this.maxParticipant = maxParticipant;
		this.voteDuration = voteDuration;
		this.entryCode = entryCode;
		this.createMemberId = createMemberId;
		this.totalEntryCount = totalEntryCount;
	}
	
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
	public int getMaxParticipant() {
		return maxParticipant;
	}
	public void setMaxParticipant(int maxParticipant) {
		this.maxParticipant = maxParticipant;
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
	public long getCreateMemberId() {
		return createMemberId;
	}
	public void setCreateMemberId(long createMemberId) {
		this.createMemberId = createMemberId;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	public int getTotalEntryCount() {
		return totalEntryCount;
	}
	public void setTotalEntryCount(int totalEntryCount) {
		this.totalEntryCount = totalEntryCount;
	}
	public String getVoteStatus() {
		return voteStatus;
	}

	public void setVoteStatus(String voteStatus) {
		this.voteStatus = voteStatus;
	}

	@Override
	public String toString() {
		return "Room [roomId=" + roomId + ", name=" + name + ", maxParticipant=" + maxParticipant + ", voteDuration="
				+ voteDuration + ", entryCode=" + entryCode + ", createMemberId=" + createMemberId + ", createdAt="
				+ createdAt + ", totalEntryCount=" + totalEntryCount + ", voteStatus=" + voteStatus + "]";
	}

	public void generateEntryCode() {
		final String CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		String generatedCode = "";
		
		for(int i = 0; i < 6; i++) {
			int n = (int)(Math.random() * CHARACTERS.length()); // 0 ~ 문자열 길이
			generatedCode += CHARACTERS.charAt(n);
		}
		
		this.entryCode = generatedCode;
	}

}
