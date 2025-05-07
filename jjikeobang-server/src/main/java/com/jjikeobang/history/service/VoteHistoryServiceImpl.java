package com.jjikeobang.history.service;

import com.jjikeobang.history.model.VoteHistory;
import com.jjikeobang.history.repository.VoteHistoryRepository;
import com.jjikeobang.history.repository.VoteHistoryRepositoryImpl;

public class VoteHistoryServiceImpl implements VoteHistoryService {
    private VoteHistoryRepository voteHistoryRepository;

    public VoteHistoryServiceImpl() {
        this.voteHistoryRepository = new VoteHistoryRepositoryImpl();
    }

    public void insertVoteHistory(VoteHistory voteHistory) {
        voteHistoryRepository.insertHistory(voteHistory);
    }
}
