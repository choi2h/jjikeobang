package com.jjikeobang.room.service;

import java.sql.SQLException;

import com.jjikeobang.room.dto.EntryRoomDto;
import com.jjikeobang.room.model.Room;

public interface RoomService {
	
	Room findById(long roomId);
	EntryRoomDto findByEntryCode(String entryCode);
	void insertRoom(Room room) throws SQLException;
}

