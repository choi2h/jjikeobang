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
		roomRepository.insertRoom(room);
	}

	@Override
	public Room findById(long roomId) {
		return roomRepository.findById(roomId);
	}

	@Override
	public Room findByEntryCode(String entryCode) {
		return roomRepository.findByEntryCode(entryCode);
	}

	@Override
	public void updateRoom(Room room) {
		roomRepository.updateRoomTotalEntryCount(room);
	}
	
}
