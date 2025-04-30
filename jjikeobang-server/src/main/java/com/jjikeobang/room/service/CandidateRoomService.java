package com.jjikeobang.room.service;
import java.util.List;
import com.jjikeobang.candidate.model.Candidate;

public interface CandidateRoomService {
	List<Candidate> findAllByRoomId(long roomId);
}
