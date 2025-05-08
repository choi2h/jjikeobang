package com.jjikeobang.candidate.service;

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

	@Override
	public int insertAllByRoomId(Candidate candidate) {
		//유효성 검사
		if(candidate.getName() == null || candidate.getName().trim().isEmpty()) {
			throw new IllegalArgumentException("후보자 이름이 비어있습니다.");
		}
		
		if(candidate.getDescription() == null || candidate.getDescription().trim().isEmpty()) {
			throw new IllegalArgumentException("후보자 소개가 비어있습니다.");
		}
		
		if(candidate.getPromise()==null || candidate.getPromise().trim().isEmpty()) {
			throw new IllegalArgumentException("후보자 공약이 비어있습니다.");
		}
		
		if(candidate.getSignNumber()<=0) {
			throw new IllegalArgumentException("후보자 번호는 1 이상이어야 합니다.");
		}
		
		if(candidate.getRoomId()<=0) {
			throw new IllegalArgumentException("방 번호는 1 이상이어야 합니다.");
		}
			
		return candidateRepository.insertCandidate(candidate);
	}

}
