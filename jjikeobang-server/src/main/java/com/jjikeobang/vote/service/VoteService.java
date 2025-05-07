package com.jjikeobang.vote.service;

import com.jjikeobang.candidate.model.Candidate;
import com.jjikeobang.vote.model.VoteHistory;

public interface VoteService {

	void updateCandidateVoteCount(Candidate candidate);

	void insertVoteHistory(VoteHistory voteHistory);

	int selectTotalVoteCount(long roomId);

}
