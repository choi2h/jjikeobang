package com.vote.repository;

import com.jjikeobang.candidate.model.Candidate;

public interface VoteRepository {
    String VOTE_CANDIDATE_SQL = "update candidate set vote_count = ifnull(vote_count,0) + 1 where candidate_id = ?";

    String FIND_BY_ID_SQL = "select * from candidate where room_id = ? and candidate_id = ?";

    void updateCandidate(Candidate candidate);
    Candidate findById(long roomId, long candidateId);

}
