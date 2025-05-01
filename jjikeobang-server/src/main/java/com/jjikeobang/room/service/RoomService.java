package com.jjikeobang.room.service;

import java.sql.SQLException;

import com.jjikeobang.room.dto.EntryRoomInfoDto;
import com.jjikeobang.room.model.Room;

public interface RoomService {
	
	void insertRoom(Room room) throws SQLException;

	//  방 입장 시 필요한 모든 정보(방 정보, 후보자, 투표 여부 등) 조회
	EntryRoomInfoDto getEntryRoomInfo(Long roomId);
}

