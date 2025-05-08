package com.jjikeobang.history.repository;

import com.jjikeobang.history.dto.VoteHistoryDto;
import com.jjikeobang.history.model.VoteHistory;

import java.util.List;

public interface VoteHistoryRepository {
    String INSERT_VOTE_HISTORY = "INSERT INTO VOTE_HISTORY(ROOM_ID, MEMBER_ID, NAME, CREATED_AT) VALUES(?,?,?, NOW())";
    String SELECT_VOTE_HISTORY_BY_MEMBER_ID = "SELECT HISTORY_ID, MEMBER_ID, ROOM_ID, CREATED_AT, NAME FROM VOTE_HISTORY WHERE MEMBER_ID = ?";

    void insertHistory(VoteHistory voteHistory);
    List<VoteHistory> findByMemberId(Long memberId);
}
