package com.jjikeobang.vote.service;

import com.jjikeobang.candidate.model.Candidate;
import com.jjikeobang.vote.model.VoteHistory;
import com.jjikeobang.vote.repository.VoteRepository;
import com.jjikeobang.vote.repository.VoteRepositoryImpl;

public class VoteServiceImpl implements VoteService{
	
	private final VoteRepository voteRepository;
	
	public VoteServiceImpl() {
		this.voteRepository = new VoteRepositoryImpl();
	}
	
	@Override
	public void updateCandidateVoteCount(Candidate candidate) {
		voteRepository.updateCandidateVoteCount(candidate);
	}

	@Override
	public void insertVoteHistory(VoteHistory voteHistory) {
		voteRepository.insertVoteHistory(voteHistory);
	}

	@Override
	public int selectTotalVoteCount(long roomId) {
		return voteRepository.selectTotalVoteCount(roomId);
	}

}
