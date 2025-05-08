package com.jjikeobang.vote.model;

public class CandidateInfo {
    private Long candidateId;
    private int voteAmount;

    public CandidateInfo(Long candidateId) {
        this.candidateId = candidateId;
        this.voteAmount = 0;
    }

    public void vote(){
        this.voteAmount++;
    }

    public Long getCandidateId() {
        return candidateId;
    }

    public int getVoteAmount() {
        return voteAmount;
    }
}
