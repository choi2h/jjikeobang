package com.jjikeobang.history.dto;

public class HistoryCandidateDto {
    private int signNumber;
    private String name;
    private int voteCount;

    public HistoryCandidateDto(int signNumber, String name, int voteCount) {
        this.signNumber = signNumber;
        this.name = name;
        this.voteCount = voteCount;
    }

    public int getSignNumber() {
        return signNumber;
    }

    public void setSignNumber(int signNumber) {
        this.signNumber = signNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(int voteCount) {
        this.voteCount = voteCount;
    }
}
