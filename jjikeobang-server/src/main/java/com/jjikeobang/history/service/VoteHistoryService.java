package com.jjikeobang.history.service;

import com.jjikeobang.history.dto.VoteHistoryDto;
import com.jjikeobang.history.model.VoteHistory;

import java.util.List;

public interface VoteHistoryService {
    void addVoteHistory(Long roomId, Long memberId, String nickname);
    List<VoteHistoryDto> findByMemberId(Long memberId);
}
