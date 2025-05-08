package com.jjikeobang.vote.repository;

import java.util.Map;

import com.jjikeobang.candidate.model.Candidate;

public interface VoteResultRepository {
	
	final String FIND_TOP_CANDIDATE_SQL = "SELECT "
			+ "	CANDIDATE_ID, "
			+ "	ROOM_ID, "
			+ "	NAME, "
			+ "	DESCRIPTION, "
			+ "	PROMISE, "
			+ "	IFNULL(VOTE_COUNT, 0) VOTE_COUNT, "
			+ "	CREATED_AT, "
			+ "	SIGN_NUMBER "
			+ "FROM CANDIDATE "
			+ "WHERE ROOM_ID = ? "
			+ "ORDER BY IFNULL(VOTE_COUNT, 0) DESC, CANDIDATE_ID ASC "
			+ "LIMIT 1";
	
	final String GET_VOTE_RATE_SQL = "WITH VOTE_INFO AS ( "
			+ "SELECT  "
			+ "	A.ROOM_ID, "
			+ "	A.TOTAL_ENTRY_COUNT, "
			+ "	B.TOTAL_VOTE_COUNT, "
			+ "	A.TOTAL_ENTRY_COUNT - B.TOTAL_VOTE_COUNT AS ABS_VOTE_COUNT, "
			+ "	C.VOTE_COUNT "
			+ "FROM ( "
			+ "		SELECT "
			+ "			ROOM_ID, "
			+ "			IFNULL(TOTAL_ENTRY_COUNT, 0) TOTAL_ENTRY_COUNT "
			+ "		FROM VOTE_ROOM "
			+ "		WHERE ROOM_ID = ? "
			+ "	) A  "
			+ "JOIN ( "
			+ "		SELECT  "
			+ "			ROOM_ID, "
			+ "			SUM(IFNULL(VOTE_COUNT,0)) TOTAL_VOTE_COUNT "
			+ "		FROM CANDIDATE "
			+ "		WHERE ROOM_ID = ? "
			+ "	) B ON A.ROOM_ID = B.ROOM_ID "
			+ "JOIN ( "
			+ "		SELECT  "
			+ "			ROOM_ID, "
			+ "			IFNULL(VOTE_COUNT, 0) VOTE_COUNT "
			+ "		FROM CANDIDATE "
			+ "		WHERE ROOM_ID = ? "
			+ "		ORDER BY IFNULL(VOTE_COUNT, 0) DESC, CANDIDATE_ID ASC "
			+ "		LIMIT 1 "
			+ "	) C ON B.ROOM_ID = C.ROOM_ID "
			+ ") "
			+ "SELECT "
			+ "	TOTAL_ENTRY_COUNT, "
			+ "	ROUND((TOTAL_VOTE_COUNT / TOTAL_ENTRY_COUNT) * 100, 2) AS VOTE_RATE, "
			+ "	ROUND((ABS_VOTE_COUNT / TOTAL_ENTRY_COUNT) * 100, 2) AS ABS_VOTE_RATE, "
			+ "	ROUND((VOTE_COUNT / TOTAL_ENTRY_COUNT) * 100, 2) AS TOP_CANDIDATE_VOTE_RATE "
			+ "FROM VOTE_INFO";
	
	Candidate findTopCandidate(long roomId);

	Map<String, Object> getVoteRateByRoomId(long roomId);

}
