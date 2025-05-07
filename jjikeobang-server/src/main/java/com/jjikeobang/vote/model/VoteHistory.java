package com.jjikeobang.vote.model;

import java.time.LocalDateTime;

public class VoteHistory {
	
	private long historyId;
	private long memberId;
	private long roomId;
	private LocalDateTime createdAt;
	
	public long getHistoryId() {
		return historyId;
	}
	public void setHistoryId(long historyId) {
		this.historyId = historyId;
	}
	public long getMemberId() {
		return memberId;
	}
	public void setMemberId(long memberId) {
		this.memberId = memberId;
	}
	public long getRoomId() {
		return roomId;
	}
	public void setRoomId(long roomId) {
		this.roomId = roomId;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	
	@Override
	public String toString() {
		return "VoteHistory [historyId=" + historyId + ", memberId=" + memberId + ", roomId=" + roomId + ", createdAt="
				+ createdAt + "]";
	}
}
