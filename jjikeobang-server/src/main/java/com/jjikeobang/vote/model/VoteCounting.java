package com.jjikeobang.vote.model;

import com.jjikeobang.util.JsonUtil;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class VoteCounting {
    List<CandidateInfo> candidates;
    int totalAmount;

    private final Lock lock = new ReentrantLock();

    private VoteCounting(List<CandidateInfo> candidates) {
        this.candidates = candidates;
        totalAmount = 0;
    }

    public static VoteCounting of(List<CandidateInfo> candidates) {
        return new VoteCounting(candidates);
    }

    public void vote(Long candidateId) throws IllegalArgumentException {
        lock.lock();
        Optional<CandidateInfo> candidate = candidates.stream()
                .filter(candidateInfo -> Objects.equals(candidateInfo.getCandidateId(), candidateId))
                .findFirst();
        if (candidate.isPresent()) {
            CandidateInfo candidateInfo = candidate.get();
            candidateInfo.vote();
            totalAmount++;
        } else {
            throw new IllegalArgumentException("candidateId 불일치");
        }

        lock.unlock();
    }

    public Map<String, Object> toObjectMap(){
        Map<String, Object> response = new HashMap<>();

        response.put("candidates", candidates);
        response.put("totalAmount",totalAmount);

        return response;
    }
}
