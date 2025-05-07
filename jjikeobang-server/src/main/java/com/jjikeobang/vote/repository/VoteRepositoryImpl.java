package com.jjikeobang.vote.repository;

import static com.jjikeobang.util.DatabaseUtil.Close;
import static com.jjikeobang.util.DatabaseUtil.commit;
import static com.jjikeobang.util.DatabaseUtil.getConnection;
import static com.jjikeobang.util.DatabaseUtil.rollback;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.jjikeobang.candidate.model.Candidate;
import com.jjikeobang.vote.model.VoteHistory;

public class VoteRepositoryImpl implements VoteRepository{

	@Override
	public void updateCandidateVoteCount(Candidate candidate) {

		Connection conn = getConnection();
		
		try (PreparedStatement psmt = conn.prepareStatement(UPDATE_CANDIDATE_VOTE_COUNT_SQL)) {
	            
			psmt.setLong(1, candidate.getCandidateId());
	            
		    int res = psmt.executeUpdate();
		
		    if (res > 0) {
		    	commit(conn);
		    }else {
		    	rollback(conn);
		    }
		    
		} catch (SQLException e) {
			rollback(conn);
		    e.printStackTrace();
		} finally {
			Close(conn);
		}
	}

	@Override
	public void insertVoteHistory(VoteHistory voteHistory) {
		Connection conn = getConnection();
		
		try (PreparedStatement psmt = conn.prepareStatement(INSERT_VOTE_HISTORY_SQL)) {
	            
			psmt.setLong(1, voteHistory.getMemberId());
			psmt.setLong(2, voteHistory.getRoomId());
	            
		    int res = psmt.executeUpdate();
		
		    if (res > 0) {
		    	commit(conn);
		    }else {
		    	rollback(conn);
		    }
		    
		} catch (SQLException e) {
			rollback(conn);
		    e.printStackTrace();
		} finally {
			Close(conn);
		}
	}

	@Override
	public int selectTotalVoteCount(long roomId) {
		Connection conn = getConnection();
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		int totVoteCnt = 0;
		
		try {
			pstmt = conn.prepareStatement(SELECT_TOTAL_VOTE_COUNT_SQL);
			pstmt.setLong(1,roomId);
			
			rs = pstmt.executeQuery();
	        while (rs.next()) {
	        	totVoteCnt = rs.getInt(1);
	        }	
			
		}catch(SQLException e) {
			e.printStackTrace();
		}finally {
			Close(rs);
			Close(pstmt);
			Close(conn);
		}
		
		return totVoteCnt;
	}
}
