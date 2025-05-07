package com.jjikeobang.history.repository;

import com.jjikeobang.history.model.VoteHistory;

public interface VoteHistoryRepository {
    static final String INSERT_VOTE_HISTORY = "INSERT INTO VOTE_HISTORY(ROOM_ID, MEMBER_ID, NAME, CREATE_AT) VALUES(?,?,?, NOW())";

    void insertHistory(VoteHistory voteHistory);
}
