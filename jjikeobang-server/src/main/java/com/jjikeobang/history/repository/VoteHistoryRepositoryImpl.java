package com.jjikeobang.history.repository;

import com.jjikeobang.history.model.VoteHistory;
import com.jjikeobang.util.DatabaseUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import static com.jjikeobang.util.DatabaseUtil.getConnection;

public class VoteHistoryRepositoryImpl implements VoteHistoryRepository {

    @Override
    public void insertHistory(VoteHistory voteHistory) {
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement psmt = conn.prepareStatement(INSERT_VOTE_HISTORY)) {
            psmt.setLong(1, voteHistory.getRoomId());
            psmt.setLong(2, voteHistory.getMemberId());
            psmt.setString(3, voteHistory.getNickname());
            psmt.setTimestamp(4, Timestamp.valueOf(voteHistory.getCreatedAt()));

            int res = psmt.executeUpdate();
            if (res > 0) {
                DatabaseUtil.commit(conn);

                ResultSet rs = psmt.getGeneratedKeys();

                if (rs.next()) {
                    voteHistory.setHistoryId(rs.getLong(1));
                }
            }else {
                DatabaseUtil.rollback(conn);
                throw new SQLException();
            }
        } catch (SQLException se) {
            se.printStackTrace();
        }
    }

    @Override
    public List<VoteHistory> findByMemberId(Long memberId) {
        //값 담을 새 List 생성
        List<VoteHistory> voteHistoryList = new ArrayList<>();

        //try catch로 에러 핸들링해주고, 연결 및 preparedStatement 준비?
        try(Connection conn = getConnection();
        PreparedStatement psmt = conn.prepareStatement(SELECT_VOTE_HISTORY_BY_MEMBER_ID)){
            //바인딩
            psmt.setLong(1, memberId);
            ResultSet rs = psmt.executeQuery();

            //반복하면서 List 속 값 읽어 내려간 후 List에 추가
            while (rs.next()){
                //모델 객체로 받는다 = 모델에 선언되어 있는 필드로 받는다? -> 받은걸 voteHistory에 담고 위에 리스트에 추가
                VoteHistory voteHistory = new VoteHistory();
                voteHistory.setHistoryId(rs.getLong("history_id"));
                voteHistory.setMemberId(rs.getLong("member_id"));
                voteHistory.setRoomId(rs.getLong("room_id"));
                voteHistory.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
                voteHistory.setNickname(rs.getString("name"));

                voteHistoryList.add(voteHistory);
            }
        }catch (SQLException e){
            e.printStackTrace();
        }

        return voteHistoryList;
    }
}
