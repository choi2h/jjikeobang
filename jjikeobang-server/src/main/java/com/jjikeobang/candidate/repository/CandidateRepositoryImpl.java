package com.jjikeobang.candidate.repository;
import static com.jjikeobang.util.DatabaseUtil.*;
import static com.jjikeobang.util.TypeMapperUtil.stringToLocalDateTime;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.jjikeobang.candidate.model.Candidate;

public class CandidateRepositoryImpl implements CandidateRepository {
	
	//후보자 조회
	@Override
	public List<Candidate> findAllByRoomId(long roomId) {
		List<Candidate> candidates = new ArrayList<>();
		Connection conn = getConnection();
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
			pstmt = conn.prepareStatement(SELECT_ALL_CANDIDATES_BY_ROOM_ID);
			pstmt.setLong(1,roomId);
			
			rs = pstmt.executeQuery();
	        while (rs.next()) {
	            candidates.add(new Candidate(
	                rs.getLong(1),                       
	                rs.getLong(2),                         
	                rs.getString(3),                       
	                rs.getString(4),                    
	                rs.getString(5),                    
	                rs.getInt(6),                        
	                stringToLocalDateTime(rs.getString(7)),
	                rs.getInt(8)
	            ));
	        }	
			
		}catch(SQLException e) {
			e.printStackTrace();
		}finally {
			Close(rs);
			Close(pstmt);
			Close(conn);
		}
		
		return candidates;
	}

	@Override
	public int insertCandidate(Candidate candidate) {
		Connection conn = getConnection();
		PreparedStatement pstmt = null;
		int rs = 0;
		
		try {
			pstmt = conn.prepareStatement(INSERT_ALL_CANDIDATES_BY_ROOM_ID);
			pstmt.setLong(1,candidate.getRoomId());
			pstmt.setString(2, candidate.getName());
			pstmt.setString(3,candidate.getDescription());
			pstmt.setString(4, candidate.getPromise());
			pstmt.setInt(5, candidate.getSignNumber());
			
			rs = pstmt.executeUpdate();
			
			if(rs>0) {
				commit(conn);
			}else {
				rollback(conn);
			}
			
		}catch(SQLException e) {
			rollback(conn);
			e.printStackTrace();
		}finally {
			Close(pstmt);
			Close(conn);
		}
		
		return rs;
	}
	
}
