package com.jjikeobang.vote.service;

import java.util.Map;

import com.jjikeobang.candidate.model.Candidate;
import com.jjikeobang.vote.repository.VoteResultRepository;
import com.jjikeobang.vote.repository.VoteResultRepositoryImpl;

public class VoteResultServiceImpl implements VoteResultService {

	private final VoteResultRepository voteResultRepository;
	
	public VoteResultServiceImpl() {
		this.voteResultRepository = new VoteResultRepositoryImpl();
	}
	
	@Override
	public Map<String, Object> getVoteResult(long roomId) {
		
		// 1위 후보자 정보
		Candidate candidate = voteResultRepository.findTopCandidate(roomId);
		// 투표 통계 정보
		Map<String, Object> voteRateInfo = voteResultRepository.getVoteRateByRoomId(roomId);
		
		voteRateInfo.put("signNumber", candidate.getSignNumber());
		voteRateInfo.put("name", candidate.getName());
		voteRateInfo.put("description", candidate.getDescription());
		voteRateInfo.put("promise", candidate.getPromise());
		voteRateInfo.put("voteCount",candidate.getVoteCount());
		
		return voteRateInfo;
	}

}
