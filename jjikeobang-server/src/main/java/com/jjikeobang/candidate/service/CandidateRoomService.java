package com.jjikeobang.candidate.service;
import java.util.List;
import com.jjikeobang.candidate.model.Candidate;

public interface CandidateRoomService {
	List<Candidate> findAllByRoomId(long roomId);
	int insertAllByRoomId(Candidate candidate);
}
