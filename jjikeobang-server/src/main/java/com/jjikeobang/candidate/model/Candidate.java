package com.jjikeobang.candidate.model;

import java.time.LocalDateTime;

public class Candidate {
	
	private long candidateId;
	private long roomId;
	private String name;
	private String description;
	private String promise;
	private int voteCount;
	private int signNumber;
    private LocalDateTime createdAt;
    private int signNumber;
    
    public Candidate() {}
    
	public Candidate(long candidateId, long roomId, String name, String description, String promise, int voteCount, 
			LocalDateTime createdAt, int signNumber) {
		this.candidateId = candidateId;
		this.roomId = roomId;
		this.name = name;
		this.description = description;
		this.promise = promise;
		this.voteCount = voteCount;
		this.createdAt = createdAt;
		this.signNumber = signNumber;
	}


	public long getCandidateId() {
		return candidateId;
	}

	public void setCandidateId(long candidateId) {
		this.candidateId = candidateId;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPromise() {
		return promise;
	}

	public void setPromise(String promise) {
		this.promise = promise;
	}

	public int getVoteCount() {
		return voteCount;
	}

	public void setVoteCount(int voteCount) {
		this.voteCount = voteCount;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public int getSignNumber() {
		return signNumber;
	}

	public void setSignNumber(int signNumber) {
		this.signNumber = signNumber;
	}

	@Override
	public String toString() {
		return "Candidate [candidateId=" + candidateId + ", roomId=" + roomId + ", name=" + name + ", description="
				+ description + ", promise=" + promise + ", voteCount=" + voteCount + ", signNumber=" + signNumber
				+ ", createdAt=" + createdAt + "]";
	}
}
