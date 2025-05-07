package com.jjikeobang.candidate.service;
import java.util.List;
import com.jjikeobang.candidate.model.Candidate;

public interface CandidateService {
	List<Candidate> findAllByRoomId(long roomId);

	void insertCandidates(List<Candidate> candidates);
}
