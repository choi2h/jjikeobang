package com.jjikeobang.room.repository;

import java.sql.SQLException;

import com.jjikeobang.room.model.Candidate;
import com.jjikeobang.room.model.Room;

public interface RoomRepository {
	
	String INSERT_ROOM_SQL = "INSERT INTO VOTE_ROOM(NAME, MAX_PARTICIPANT, VOTE_DURATION,"
			+ "ENTRY_CODE, CREATE_MEMBER_ID, CREATED_AT) VALUES (?,?,?,?,?, now());";
	
	String INSERT_CANDIDATE_SQL = "INSERT INTO CANDIDATE (ROOM_ID, NAME, DESCRIPTION, "
			+ "PROMISE, CREATED_AT)VALUES(?,?,?,?, now());";

	Room insertRoom(Room room) throws SQLException;
	
	void insertCandidate(Candidate candidate) throws SQLException;
}
