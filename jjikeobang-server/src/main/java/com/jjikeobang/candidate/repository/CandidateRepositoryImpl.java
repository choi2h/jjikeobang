package com.jjikeobang.candidate.repository;
import static com.jjikeobang.util.DatabaseUtil.*;

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
	                rs.getTimestamp(7).toLocalDateTime()  
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
	
	//후보자 수정[관리자]
	@Override
	public boolean updateForAdmin(Candidate candidate) {
		
		return false;
	}
	
	//후보자 삭제[관리자]
	@Override
	public boolean deleteForAdmin(long roomId, long candidateId) {
		return false;
	}

}
