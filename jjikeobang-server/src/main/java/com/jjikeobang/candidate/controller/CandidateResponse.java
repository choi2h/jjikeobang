package com.jjikeobang.candidate.controller;

import java.util.List;
import com.jjikeobang.candidate.model.Candidate;
import com.jjikeobang.common.Response;

public class CandidateResponse extends Response {
	
	private final List<Candidate> candidates;

	public CandidateResponse(int statusCode, List<Candidate> candidates) {
		super(statusCode);
		this.candidates = candidates;
	}
	
	public List<Candidate> getCandidates(){
		return candidates;
	}

}
