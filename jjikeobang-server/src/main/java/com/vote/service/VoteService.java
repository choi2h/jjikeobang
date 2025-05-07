package com.vote.service;

import com.jjikeobang.candidate.model.Candidate;

public interface VoteService {
    void vote(Candidate candidate);
    Candidate findById(long roomId, long candidateId);
}
