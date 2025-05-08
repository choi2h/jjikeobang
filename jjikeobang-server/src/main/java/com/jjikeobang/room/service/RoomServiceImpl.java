package com.jjikeobang.room.service;
import com.jjikeobang.chat.service.ChatConnectionService;
import com.jjikeobang.chat.service.ChatConnectionServiceImpl;
import com.jjikeobang.room.dto.EntryRoomDto;
import com.jjikeobang.room.exception.RoomFullException;
import com.jjikeobang.room.model.Room;
import com.jjikeobang.room.repository.RoomRepository;
import com.jjikeobang.room.repository.RoomRepositoryImpl;

import java.sql.SQLException;

public class RoomServiceImpl implements RoomService {

	private static final String PREFIX_MEMBER_NAME = "익명";

	private final RoomRepository roomRepository;
	private final ChatConnectionService chatConnectionService;


	public RoomServiceImpl() {
		this.roomRepository = new RoomRepositoryImpl();
		this.chatConnectionService = ChatConnectionServiceImpl.getInstance();
	}

	@Override
	public void insertRoom(Room room) throws SQLException {
		Room resRoom = roomRepository.insertRoom(room);
		//chatConnectionService.addRoom(resRoom.getRoomId());
	}

	@Override
	public Room findById(long roomId) {
		return  roomRepository.findById(roomId);
	}

	@Override
	public EntryRoomDto findByEntryCode(String entryCode) {
		Room room = roomRepository.findByEntryCode(entryCode);
		if(room == null) {
			System.out.println("Not found room by entryCode: " + entryCode);
			throw new IllegalArgumentException("Not found room by entry code. entryCode=" + entryCode);
		}

		if(room.getMaxParticipant() <= room.getTotalEntryCount()) {
			throw new RoomFullException("Room is already full. maxCount=" + room.getMaxParticipant() +
					", totalEntryCount=" + room.getTotalEntryCount());
		}

		return toRoomInfoDto(room);
	}

	private EntryRoomDto toRoomInfoDto(Room room) {
		EntryRoomDto roomInfoDto = new EntryRoomDto();
		roomInfoDto.setRoomId(room.getRoomId());
		roomInfoDto.setName(room.getName());
		roomInfoDto.setVoteDuration(room.getVoteDuration());
		roomInfoDto.setEntryCode(room.getEntryCode());
		roomInfoDto.setMaxParticipantCount(room.getMaxParticipant());
		roomInfoDto.setTotalEntryCount(room.getTotalEntryCount());
		roomInfoDto.setCreateMemberId(room.getCreateMemberId());
		roomInfoDto.setUserNickname(PREFIX_MEMBER_NAME+(room.getTotalEntryCount()+1));
		return roomInfoDto;
	}
}



