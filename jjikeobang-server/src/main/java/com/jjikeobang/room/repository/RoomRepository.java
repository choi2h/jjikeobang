package com.jjikeobang.room.repository;

import java.sql.SQLException;
import java.util.List;

import com.jjikeobang.room.model.Candidate;
import com.jjikeobang.room.model.Room;

public interface RoomRepository {
	
	String INSERT_ROOM_SQL = "INSERT INTO VOTE_ROOM(NAME, MAX_PARTICIPANT, VOTE_DURATION,"
			+ "ENTRY_CODE, CREATE_MEMBER_ID, CREATED_AT) VALUES (?,?,?,?,?, now());";
	
	String INSERT_CANDIDATE_SQL = "INSERT INTO CANDIDATE (ROOM_ID, NAME, DESCRIPTION, "
			+ "PROMISE, CREATED_AT)VALUES(?,?,?,?, now());";


	String FIND_BY_ID_SQL = "SELECT * FROM Vote_room WHERE room_ID = ?";

	String FIND_CANDIDATES_BY_ROOM_ID_SQL = "SELECT * FROM Candidate WHERE room_ID = ?";

	// String FIND_VOTE_HISTORY_SQL = "SELECT * FROM VoteHistory WHERE roomId = ? AND memberId = ?";


	Room insertRoom(Room room) throws SQLException;
	
	void insertCandidate(Candidate candidate) throws SQLException;


	// ① 방 정보 단건 조회
	Room findById(Long roomId);


	// ② 특정 방의 후보자 목록 조회
	List<Candidate> findCandidatesByRoomId(Long roomId);

	// ③ 특정 사용자의 방 내 투표 참여 기록 조회
	//com.jjikeobang.room.model.VoteHistory findVoteHistoryByRoomIdAndMemberId(Long roomId, Long memberId) throws SQLException;
}
