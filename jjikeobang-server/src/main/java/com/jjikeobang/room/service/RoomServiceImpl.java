package com.jjikeobang.room.service;

import java.sql.SQLException;
import java.util.List;

import com.jjikeobang.room.model.Candidate;
import com.jjikeobang.room.model.Room;
import com.jjikeobang.room.repository.RoomRepository;
import com.jjikeobang.room.repository.RoomRepositoryImpl;

public class RoomServiceImpl implements RoomService {
	
	public final RoomRepository roomRepository;
	//public final CandidateRepository candidateRepository;
	
	public RoomServiceImpl () {
		roomRepository = new RoomRepositoryImpl();
	}
	
	@Override
	public void insertRoom(Room room) throws SQLException {
		Room resRoom = roomRepository.insertRoom(room);
		
		List<Candidate> candidates = room.getCandidates();
		
		if(candidates != null && candidates.size() > 0) {
			for(Candidate candidate : candidates) {
				candidate.setRoomId(resRoom.getRoomId());
				roomRepository.insertCandidate(candidate);
				//candidateRepository.insertCandidate();
			}
		}
	}
	
}
