package com.jjikeobang.room.service;

import java.sql.SQLException;

import com.jjikeobang.chat.service.ChatConnectionService;
import com.jjikeobang.chat.service.ChatConnectionServiceImpl;
import com.jjikeobang.room.model.Room;
import com.jjikeobang.room.repository.RoomRepository;
import com.jjikeobang.room.repository.RoomRepositoryImpl;

public class RoomServiceImpl implements RoomService {
	private final RoomRepository roomRepository;
	private final ChatConnectionService chatConnectionService;

	public RoomServiceImpl () {
		roomRepository = new RoomRepositoryImpl();
		chatConnectionService = ChatConnectionServiceImpl.getInstance();
	}

	@Override
	public void insertRoom(Room room) throws SQLException {
		Room resRoom = roomRepository.insertRoom(room);
		chatConnectionService.addRoom(resRoom.getRoomId());
	}

	@Override
	public Room findById(long roomId) {
		return roomRepository.findById(roomId);
	}
}
