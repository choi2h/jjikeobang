package com.jjikeobang.vote.repository;

import com.jjikeobang.candidate.model.Candidate;
import com.jjikeobang.vote.model.VoteHistory;

public interface VoteRepository {
	
	final String UPDATE_CANDIDATE_VOTE_COUNT_SQL = "UPDATE CANDIDATE SET "
			+ "VOTE_COUNT = IFNULL(VOTE_COUNT, 0) + 1 "
			+ "WHERE CANDIDATE_ID = ?";
	
	final String INSERT_VOTE_HISTORY_SQL = "INSERT INTO VOTE_HISTORY(MEMBER_ID, ROOM_ID, CREATED_AT) "
			+ "VALUES(?,?, NOW())";
	
	final String SELECT_TOTAL_VOTE_COUNT_SQL = "SELECT COUNT(*) FROM VOTE_HISTORY WHERE ROOM_ID = ?";

	void updateCandidateVoteCount(Candidate candidate);

	void insertVoteHistory(VoteHistory voteHistory);

	int selectTotalVoteCount(long roomId);

}
