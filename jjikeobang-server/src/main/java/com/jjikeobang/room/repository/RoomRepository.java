package com.jjikeobang.room.repository;

import java.sql.SQLException;
import java.util.List;

import com.jjikeobang.room.model.Room;

public interface RoomRepository {
	String SELECT_ROOM_SQL = "SELECT ROOM_ID,NAME, MAX_PARTICIPANT, VOTE_DURATION, ENTRY_CODE, "
			+ "CREATE_MEMBER_ID, TOTAL_ENTRY_COUNT FROM VOTE_ROOM WHERE ROOM_ID = ?";
	
	String INSERT_ROOM_SQL = "INSERT INTO VOTE_ROOM(NAME, MAX_PARTICIPANT, VOTE_DURATION,"
			+ "ENTRY_CODE, CREATE_MEMBER_ID, CREATED_AT) VALUES (?,?,?,?,?, now());";

	String SELECT_ROOM_BY_ENTRY_CODE = "SELECT ROOM_ID,NAME, MAX_PARTICIPANT, VOTE_DURATION, ENTRY_CODE, "
			+ "CREATE_MEMBER_ID, TOTAL_ENTRY_COUNT FROM VOTE_ROOM WHERE ENTRY_CODE = ?";
	
	Room insertRoom(Room room) throws SQLException;

	Room findById(long roomId);

	Room findByEntryCode(String entryCode);
}
