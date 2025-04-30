package com.jjikeobang.room.service;

import java.util.List;
import com.jjikeobang.candidate.model.Candidate;
import com.jjikeobang.candidate.repository.CandidateRepository;
import com.jjikeobang.candidate.repository.CandidateRepositoryImpl;

public class CandidateRoomServiceImpl implements CandidateRoomService {
	
	private final CandidateRepository candidateRepository = new CandidateRepositoryImpl();

	@Override
	public List<Candidate> findAllByRoomId(long roomId) {
		return candidateRepository.findAllByRoomId(roomId);
	}

}
