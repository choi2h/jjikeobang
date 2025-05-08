package com.jjikeobang.room.service;

import com.jjikeobang.room.repository.RoomRepository;
import com.jjikeobang.room.repository.RoomRepositoryImpl;

public class RoomParticipantServiceImpl implements RoomParticipantService {
    private final RoomRepository roomRepository;

    public RoomParticipantServiceImpl() {
        this.roomRepository = new RoomRepositoryImpl();
    }

    @Override
    public void incrementRoomParticipant(Long roomId) {
        int updateCount = roomRepository.updateRoomParticipant(roomId);
        if (updateCount == 1) {
            System.out.println("Increment room participant success");
        }
    }
}
