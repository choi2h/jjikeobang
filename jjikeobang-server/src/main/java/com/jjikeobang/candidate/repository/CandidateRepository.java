package com.jjikeobang.candidate.repository;
import java.util.List;
import com.jjikeobang.candidate.model.Candidate;


public interface CandidateRepository {
	
    //해당 룸에 등록된 후보자 확인
	String SELECT_ALL_CANDIDATES_BY_ROOM_ID = 
		    "SELECT *  " +
		    "FROM CANDIDATE " +
		    "WHERE ROOM_ID = ?";
	
	//대기중 해당 룸에 등록된 후보자 수정[관리자]
	String UPDATE_CANDIDATE_FOR_ADMIN = 
			"UPDATE CANDIDATE " +
			"SET NAME = ?, DESCRIPTION = ?, PROMISE = ? " +
			"WHERE CANDIDATE_ID = ? AND ROOM_ID = ?";
	
	//대기중 해당 룸에 등록된 후보자 삭제[관리자]
	String DELETE_CANDIDATE_FOR_ADMIN = 
			"DELETE FROM CANDIDATE " +
			"WHERE CANDIDATE_ID = ? AND ROOM_ID = ?";
	
	
	List<Candidate> findAllByRoomId(long roomId);
	boolean updateForAdmin(Candidate candidate);
	boolean deleteForAdmin(long roomId, long candidateId);

}
