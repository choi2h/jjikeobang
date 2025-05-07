package com.jjikeobang.vote.model;

public record VoteBroadcastDTO(
        String candidateId,
        int voteAmount
) {
}
