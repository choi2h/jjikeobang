package com.jjikeobang.room.service;

import java.sql.SQLException;

import com.jjikeobang.room.model.Room;
import com.jjikeobang.room.repository.RoomRepository;
import com.jjikeobang.room.repository.RoomRepositoryImpl;

public class RoomServiceImpl implements RoomService {
	
	public final RoomRepository roomRepository;
	
	public RoomServiceImpl () {
		roomRepository = new RoomRepositoryImpl();
	}
	
	@Override
	public void insertRoom(Room room) throws SQLException {
		Room resRoom = roomRepository.insertRoom(room);
	}

	@Override
	public Room findById(long roomId) {
		return roomRepository.findById(roomId);
	}
	
}
