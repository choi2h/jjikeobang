package com.jjikeobang.room.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import com.jjikeobang.room.dto.CandidateDto;
import com.jjikeobang.room.dto.EntryRoomInfoDto;
import com.jjikeobang.room.model.Candidate;
import com.jjikeobang.room.model.Room;
import com.jjikeobang.room.repository.RoomRepository;
import com.jjikeobang.room.repository.RoomRepositoryImpl;

public class RoomServiceImpl implements RoomService {

	public final RoomRepository roomRepository;
	//public final CandidateRepository candidateRepository;

	public RoomServiceImpl() {
		roomRepository = new RoomRepositoryImpl();
	}

	@Override
	public void insertRoom(Room room) throws SQLException {
		Room resRoom = roomRepository.insertRoom(room);

		List<Candidate> candidates = room.getCandidates();

		if (candidates != null && candidates.size() > 0) {
			for (Candidate candidate : candidates) {
				candidate.setRoomId(resRoom.getRoomId());
				roomRepository.insertCandidate(candidate);
				//candidateRepository.insertCandidate();
			}
		}
	}

	@Override
	public EntryRoomInfoDto getEntryRoomInfo(Long roomId) {
		EntryRoomInfoDto dto = new EntryRoomInfoDto();

		Room room = roomRepository.findById(roomId);
		if (room == null) {
			throw new IllegalArgumentException("해당 방이 존재하지 않습니다.");
		}
		dto.setRoomTitle(room.getName());
		dto.setMaxParticipants(room.getMaxParticipant());
		dto.setCurrentParticipants(room.getTotalEntryCount());
		List<CandidateDto> candidateDtos = getCandidateDtoList(roomId);
		dto.setCandidates(candidateDtos);
		dto.setUserNickname("익명" + new Random().nextInt(1000));
		dto.setHasVoted(false);


		return dto;
	}

	private List<CandidateDto> getCandidateDtoList(Long roomId) {
		List<Candidate> candidates = roomRepository.findCandidatesByRoomId(roomId);
		List<CandidateDto> candidateDtos = new ArrayList<>();
		for (Candidate candidate : candidates) {
			CandidateDto dto = new CandidateDto();
			dto.setId(candidate.getCandidateId());
			dto.setName(candidate.getName());
			dto.setDescription(candidate.getDescription());
			dto.setPromise(candidate.getPromise());
			candidateDtos.add(dto);
		}
	return candidateDtos;
	}

	public static void main(String[] args)  {
		RoomServiceImpl roomService = new RoomServiceImpl();

		EntryRoomInfoDto dto = roomService.getEntryRoomInfo(1L);
		System.out.println(dto.toString());
	}

}



