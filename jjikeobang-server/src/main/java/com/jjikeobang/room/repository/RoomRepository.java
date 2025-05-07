package com.jjikeobang.room.repository;

import java.sql.SQLException;

import com.jjikeobang.room.model.Room;

public interface RoomRepository {
	String SELECT_ROOM_SQL = "SELECT ROOM_ID,NAME, MAX_PARTICIPANT, VOTE_DURATION, ENTRY_CODE, "
			+ "CREATE_MEMBER_ID, TOTAL_ENTRY_COUNT, VOTE_STATUS FROM VOTE_ROOM WHERE ROOM_ID = ?";
	
	String INSERT_ROOM_SQL = "INSERT INTO VOTE_ROOM(NAME, MAX_PARTICIPANT, VOTE_DURATION,"
			+ "ENTRY_CODE, CREATE_MEMBER_ID, CREATED_AT) VALUES (?,?,?,?,?, now());";
	
	String SELECT_ROOM_BY_ENTRY_CODE_SQL = "SELECT ROOM_ID,NAME, MAX_PARTICIPANT, VOTE_DURATION, ENTRY_CODE, "
			+ "CREATE_MEMBER_ID, TOTAL_ENTRY_COUNT, VOTE_STATUS FROM VOTE_ROOM "
			+ "WHERE ENTRY_CODE = ?";
	
	String UPDATE_ROOM_TOTAL_ENTRY_COUNT_SQL = "UPDATE VOTE_ROOM "
			+ "SET TOTAL_ENTRY_COUNT = ? ,"
			+ "VOTE_STATUS = ? "
			+ "WHERE ROOM_ID = ? ";
	
	void insertRoom(Room room) throws SQLException;

	Room findById(long roomId);

	Room findByEntryCode(String entryCode);

	void updateRoomTotalEntryCount(Room room);
	
}
