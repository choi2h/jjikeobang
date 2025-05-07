package com.vote.service;

import com.jjikeobang.candidate.model.Candidate;
import com.vote.repository.VoteRepository;
import com.vote.repository.VoteRepositoryImpl;

public class VoteServiceImpl implements VoteService{
    private final VoteRepository voteRepository = new VoteRepositoryImpl();
    @Override
    public void vote(Candidate candidate) {
        voteRepository.updateCandidate(candidate);
    }

    @Override
    public Candidate findById(long roomId, long candidateId) {
        return voteRepository.findById(roomId,candidateId);
    }
}
