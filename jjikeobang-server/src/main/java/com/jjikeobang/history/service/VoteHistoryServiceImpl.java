package com.jjikeobang.history.service;

import com.jjikeobang.candidate.model.Candidate;
import com.jjikeobang.candidate.service.CandidateRoomService;
import com.jjikeobang.candidate.service.CandidateRoomServiceImpl;
import com.jjikeobang.history.dto.VoteHistoryDto;
import com.jjikeobang.history.dto.HistoryCandidateDto;
import com.jjikeobang.history.model.VoteHistory;
import com.jjikeobang.history.repository.VoteHistoryRepository;
import com.jjikeobang.history.repository.VoteHistoryRepositoryImpl;
import com.jjikeobang.room.model.Room;
import com.jjikeobang.room.service.RoomService;
import com.jjikeobang.room.service.RoomServiceImpl;

import java.util.ArrayList;
import java.util.List;

public class VoteHistoryServiceImpl implements VoteHistoryService {
    private final VoteHistoryRepository voteHistoryRepository;
    private final RoomService roomService;
    private final CandidateRoomService candidateRoomService;

    public VoteHistoryServiceImpl() {
        this.voteHistoryRepository = new VoteHistoryRepositoryImpl();
        this.roomService = new RoomServiceImpl();
        this.candidateRoomService = new CandidateRoomServiceImpl();
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
            Long roomId = voteHistory.getRoomId();
            Room room = roomService.findById(roomId);
            List<Candidate> candidates = candidateRoomService.findAllByRoomId(roomId);
            dtoList.add(toVoteHistoryDto(voteHistory, room, candidates));
        }

        return dtoList;
    }


    private VoteHistoryDto toVoteHistoryDto(VoteHistory voteHistory, Room room, List<Candidate> candidates) {
        //객체 생성 (객체타입 변경)
        VoteHistoryDto voteHistoryDto = new VoteHistoryDto();
        voteHistoryDto.setHistoryId(voteHistory.getHistoryId());
        voteHistoryDto.setRoomTitle(room.getName());
        voteHistoryDto.setTotalEntryCount(room.getTotalEntryCount());
        voteHistoryDto.getCreatedAt(voteHistory.getCreatedAt());
        List<HistoryCandidateDto> candidateDtoList = new ArrayList<>();
        for (Candidate candidate : candidates) {
            HistoryCandidateDto historyCandidateDto = new HistoryCandidateDto(candidate.getSignNumber(),
                    candidate.getName(), candidate.getVoteCount());
            candidateDtoList.add(historyCandidateDto);

        }
        voteHistoryDto.setCandidateInfos(candidateDtoList);

        System.out.println("toVoteHistoryDto: " + voteHistoryDto);
        return voteHistoryDto;
    }
}
