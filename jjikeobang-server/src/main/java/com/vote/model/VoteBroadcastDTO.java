package com.vote.model;

public record VoteBroadcastDTO(
        String candidateId,
        int voteAmount
) {
}
