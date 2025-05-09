package com.jjikeobang.vote.repository;

import static com.jjikeobang.util.DatabaseUtil.Close;
import static com.jjikeobang.util.DatabaseUtil.commit;
import static com.jjikeobang.util.DatabaseUtil.getConnection;
import static com.jjikeobang.util.TypeMapperUtil.stringToLocalDateTime;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import com.jjikeobang.candidate.model.Candidate;

public class VoteResultRepositoryImpl implements VoteResultRepository {

	@Override
	public Candidate findTopCandidate(long roomId) {
		Connection conn = getConnection();
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
			pstmt = conn.prepareStatement(FIND_TOP_CANDIDATE_SQL);
			pstmt.setLong(1,roomId);
			
			rs = pstmt.executeQuery();
	        
			if (rs.next()) {
				commit(conn);
				
	            return new Candidate(
		                rs.getLong(1),                       
		                rs.getLong(2),                         
		                rs.getString(3),                       
		                rs.getString(4),                    
		                rs.getString(5),                    
		                rs.getInt(6),                        
		                stringToLocalDateTime(rs.getString(7)),
		                rs.getInt(8)
	            );
	        }
			
		}catch(SQLException e) {
			e.printStackTrace();
		}finally {
			Close(rs);
			Close(pstmt);
			Close(conn);
		}
		
		return null;
	}

	@Override
	public Map<String, Object> getVoteRateByRoomId(long roomId) {
		Connection conn = getConnection();
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
			pstmt = conn.prepareStatement(GET_VOTE_RATE_SQL);
			pstmt.setLong(1,roomId);
			pstmt.setLong(2,roomId);
			pstmt.setLong(3,roomId);
			
			rs = pstmt.executeQuery();
	        
			if (rs.next()) {
				commit(conn);
				Map<String, Object> result = new HashMap<String, Object>();
				result.put("totalEntryCount", rs.getInt(1));
				result.put("totalVoteCount", rs.getInt(2));
				result.put("voteRate", rs.getDouble(3));
				result.put("absVoteRate", rs.getDouble(4));
				result.put("topCandidateVoteRate", rs.getDouble(5));
				
				return result;
	        }
			
		}catch(SQLException e) {
			e.printStackTrace();
		}finally {
			Close(rs);
			Close(pstmt);
			Close(conn);
		}
		
		return null;
	}
}
