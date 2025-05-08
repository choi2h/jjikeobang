package com.jjikeobang.history.service;

import com.jjikeobang.history.dto.VoteHistoryDto;
import com.jjikeobang.history.model.VoteHistory;
import com.jjikeobang.history.repository.VoteHistoryRepository;
import com.jjikeobang.history.repository.VoteHistoryRepositoryImpl;

import java.util.ArrayList;
import java.util.List;

public class VoteHistoryServiceImpl implements VoteHistoryService {
    private VoteHistoryRepository voteHistoryRepository;

    public VoteHistoryServiceImpl() {
        this.voteHistoryRepository = new VoteHistoryRepositoryImpl();
    }

    public void insertVoteHistory(VoteHistory voteHistory) {
        voteHistoryRepository.insertHistory(voteHistory);
    }

    @Override
    public List<VoteHistoryDto> findByMemberId(Long memberId) {
        //voteHistory 값을 저장할 객체
        List<VoteHistory> voteHistoryList = voteHistoryRepository.findByMemberId(memberId);

        //방 아이디로 voteHistory를 찾을 수 없을 때 에러 핸들링 (isEmpty 혹은 length==0)
        if (voteHistoryList.isEmpty()) {
            System.out.println("list is empty");
        }

        //리스트 생성 후 for문으로 dto 타입으로 변환
        List<VoteHistoryDto> dtoList = new ArrayList<>();
        //for문을 통해 toVoteHistoryDto 메소드 실행 후 값을 dto 리스트에 담음
        for (VoteHistory voteHistory : voteHistoryList) {
            dtoList.add(toVoteHistoryDto(voteHistory));
        }
        return dtoList;
    }


    private VoteHistoryDto toVoteHistoryDto(VoteHistory voteHistory) {
        //객체 생성 (객체타입 변경)
        VoteHistoryDto voteHistoryDto = new VoteHistoryDto();

        voteHistoryDto.setCreated_at(voteHistory.getCreatedAt());
        voteHistoryDto.setRoom_id(voteHistory.getRoomId());
        voteHistoryDto.setMember_id(voteHistory.getMemberId());
        voteHistoryDto.setHistory_id(voteHistory.getHistoryId());
        voteHistoryDto.setName(voteHistory.getNickname());

        return voteHistoryDto;
    }
}
