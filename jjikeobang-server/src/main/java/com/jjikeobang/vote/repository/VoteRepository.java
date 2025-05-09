package com.jjikeobang.vote.repository;

public interface VoteRepository {
    String VOTE_SQL = "UPDATE candidate SET vote_count = ifnull(vote_count + 1,1) WHERE candidate_id = ? and room_id = ?";

    void voteCandidate(long roomId, long candidateId);
}
