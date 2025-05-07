package com.jjikeobang.candidate.repository;
import java.util.List;
import com.jjikeobang.candidate.model.Candidate;


public interface CandidateRepository {
	
    //해당 룸에 등록된 후보자 확인
	String SELECT_ALL_CANDIDATES_BY_ROOM_ID = 
		    "SELECT *  " +
		    "FROM CANDIDATE " +
		    "WHERE ROOM_ID = ?";
	
	//해당 룸에 등록된 후보자 DB 저장
	String INSERT_ALL_CANDIDATES_BY_ROOM_ID = 
			"INSERT INTO CANDIDATE "+
			"(ROOM_ID,NAME,DESCRIPTION,PROMISE,SIGN_NUMBER,CREATED_AT,VOTE_COUNT) "+
			"VALUES (?,?,?,?,?,now(),0)";

	List<Candidate> findAllByRoomId(long roomId);
	int insertCandidate(Candidate candidate);

}
