package com.jjikeobang.room.service;

import java.sql.SQLException;

import com.jjikeobang.room.model.Room;

public interface RoomService {
	
	void insertRoom(Room room) throws SQLException;
	
}
