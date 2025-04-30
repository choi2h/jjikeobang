package com.jjikeobang.room.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.jjikeobang.common.JDBCTemplate;
import com.jjikeobang.room.model.Candidate;
import com.jjikeobang.room.model.Room;

public class RoomRepositoryImpl implements RoomRepository {
	
	@Override
	public Room insertRoom(Room room) throws SQLException {
		
		Connection conn = JDBCTemplate.getConnection();
		
		try (PreparedStatement psmt = conn.prepareStatement(RoomRepository.INSERT_ROOM_SQL, 
															Statement.RETURN_GENERATED_KEYS)) {
	            
			psmt.setString(1, room.getName());
			psmt.setInt(2, room.getMaxParticipant());
			psmt.setInt(3, room.getVoteDuration());
			psmt.setString(4, room.getEntryCode());
			psmt.setLong(5, room.getCreateMemberId());
	            
		    int res = psmt.executeUpdate();
		
		    if (res > 0) {
		    	JDBCTemplate.commit(conn);
		    	
		    	ResultSet rs = psmt.getGeneratedKeys();
		        
		    	if (rs.next()) {
		            room.setRoomId(rs.getLong(1));
		        }
		    }else {
		    	JDBCTemplate.rollback(conn);
		    	throw new SQLException();
		    }
		    
		} catch (SQLException e) {
			JDBCTemplate.rollback(conn);
		    e.printStackTrace();
		    throw e;
		}
		
		return room;
	}

	@Override
	public void insertCandidate(Candidate candidate) throws SQLException {
		Connection conn = JDBCTemplate.getConnection();
		
		try (PreparedStatement psmt = conn.prepareStatement(RoomRepository.INSERT_CANDIDATE_SQL)) {
	            
			psmt.setLong(1, candidate.getRoomId());
			psmt.setString(2, candidate.getName());
			psmt.setString(3, candidate.getDescription());
			psmt.setString(4, candidate.getPromise());
	            
		    int res = psmt.executeUpdate();
		
		    if (res > 0) {
		    	JDBCTemplate.commit(conn);
		    }else {
		    	JDBCTemplate.rollback(conn);
		    }
		    
		} catch (SQLException e) {
			JDBCTemplate.rollback(conn);
		    e.printStackTrace();
		    throw e;
		}
	}
}
