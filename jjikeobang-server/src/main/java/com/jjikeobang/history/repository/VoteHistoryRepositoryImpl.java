package com.jjikeobang.history.repository;

import com.jjikeobang.history.model.VoteHistory;
import com.jjikeobang.util.DatabaseUtil;

import java.sql.*;

public class VoteHistoryRepositoryImpl implements VoteHistoryRepository {

    @Override
    public void insertHistory(VoteHistory voteHistory) {
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement psmt = conn.prepareStatement(INSERT_VOTE_HISTORY)) {
            psmt.setLong(1, voteHistory.getRoomId());
            psmt.setLong(2, voteHistory.getMemberId());
            psmt.setString(3, voteHistory.getNickname());
            psmt.setTimestamp(4, Timestamp.valueOf(voteHistory.getCreateAt()));

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
}