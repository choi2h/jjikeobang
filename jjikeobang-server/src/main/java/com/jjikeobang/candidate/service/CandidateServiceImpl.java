package com.jjikeobang.candidate.service;

import java.util.List;
import com.jjikeobang.candidate.model.Candidate;
import com.jjikeobang.candidate.repository.CandidateRepository;
import com.jjikeobang.candidate.repository.CandidateRepositoryImpl;

public class CandidateServiceImpl implements CandidateService {
	
	private final CandidateRepository candidateRepository = new CandidateRepositoryImpl();

	@Override
	public List<Candidate> findAllByRoomId(long roomId) {
		return candidateRepository.findAllByRoomId(roomId);
	}

	@Override
	public void insertCandidates(List<Candidate> candidates) {
		if(candidates != null && candidates.size() > 0) {
			for(Candidate candidate : candidates) {
				candidateRepository.insertCandidate(candidate);
			}
		}
	}

}
