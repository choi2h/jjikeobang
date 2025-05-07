package com.jjikeobang.room.service;

import com.jjikeobang.room.dto.EntryRoomDto;
import com.jjikeobang.room.model.Room;
import com.jjikeobang.room.repository.RoomRepository;
import com.jjikeobang.room.repository.RoomRepositoryImpl;

import java.sql.SQLException;

public class RoomServiceImpl implements RoomService {

	private final RoomRepository roomRepository;


	public RoomServiceImpl() {
		this.roomRepository = new RoomRepositoryImpl();
	}

	@Override
	public void insertRoom(Room room) throws SQLException {
		roomRepository.insertRoom(room);
	}

	@Override
	public Room findById(long roomId) {
		return  roomRepository.findById(roomId);
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



