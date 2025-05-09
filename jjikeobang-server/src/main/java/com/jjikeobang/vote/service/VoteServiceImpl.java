package com.jjikeobang.vote.service;

import com.jjikeobang.vote.repository.VoteRepository;
import com.jjikeobang.vote.repository.VoteRepositoryImpl;

public class VoteServiceImpl implements VoteService{
    private final VoteRepository voteRepository = new VoteRepositoryImpl();
    @Override
    public void voteCandidate(long roomId, long candidateId) {
        voteRepository.voteCandidate(roomId,candidateId);
    }
}
