package com.jjikeobang.room.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.jjikeobang.util.DatabaseUtil;
import com.jjikeobang.room.model.Candidate;
import com.jjikeobang.room.model.Room;

public class RoomRepositoryImpl implements RoomRepository {
	
	@Override
	public Room insertRoom(Room room) throws SQLException {
		
		Connection conn = DatabaseUtil.getConnection();
		
		try (PreparedStatement psmt = conn.prepareStatement(RoomRepository.INSERT_ROOM_SQL, 
															Statement.RETURN_GENERATED_KEYS)) {
	            
			psmt.setString(1, room.getName());
			psmt.setInt(2, room.getMaxParticipant());
			psmt.setInt(3, room.getVoteDuration());
			psmt.setString(4, room.getEntryCode());
			psmt.setLong(5, room.getCreateMemberId());
	            
		    int res = psmt.executeUpdate();
		
		    if (res > 0) {
		    	DatabaseUtil.commit(conn);
		    	
		    	ResultSet rs = psmt.getGeneratedKeys();
		        
		    	if (rs.next()) {
		            room.setRoomId(rs.getLong(1));
		        }
		    }else {
		    	DatabaseUtil.rollback(conn);
		    	throw new SQLException();
		    }
		    
		} catch (SQLException e) {
			DatabaseUtil.rollback(conn);
		    e.printStackTrace();
		    throw e;
		}
		
		return room;
	}

	@Override
	public void insertCandidate(Candidate candidate) throws SQLException {
		Connection conn = DatabaseUtil.getConnection();
		
		try (PreparedStatement psmt = conn.prepareStatement(RoomRepository.INSERT_CANDIDATE_SQL)) {
	            
			psmt.setLong(1, candidate.getRoomId());
			psmt.setString(2, candidate.getName());
			psmt.setString(3, candidate.getDescription());
			psmt.setString(4, candidate.getPromise());
	            
		    int res = psmt.executeUpdate();
		
		    if (res > 0) {
		    	DatabaseUtil.commit(conn);
		    }else {
		    	DatabaseUtil.rollback(conn);
		    }
		    
		} catch (SQLException e) {
			DatabaseUtil.rollback(conn);
		    e.printStackTrace();
		    throw e;
		}
	}
	@Override
	public Room findById(Long roomId){

		try (Connection conn = DatabaseUtil.getConnection();
			 PreparedStatement ps = conn.prepareStatement(FIND_BY_ID_SQL)) {
			ps.setLong(1, roomId);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				Room room = new Room();
				room.setRoomId(rs.getLong("room_ID"));
				room.setName(rs.getString("name"));
				room.setMaxParticipant(rs.getInt("max_participant"));
				room.setVoteDuration(rs.getInt("vote_duration"));
				room.setEntryCode(rs.getString("entry_code"));
				room.setCreateMemberId(rs.getLong("create_Member_Id"));
				room.setCreatedAt(rs.getTimestamp("created_At").toLocalDateTime());
				room.setTotalEntryCount(rs.getInt("total_Entry_Count"));
				return room;
			}
		}catch (SQLException e){
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Candidate> findCandidatesByRoomId(Long roomId){
		List<Candidate> list = new ArrayList<>();

		try (Connection conn = DatabaseUtil.getConnection();
			 PreparedStatement ps = conn.prepareStatement(FIND_CANDIDATES_BY_ROOM_ID_SQL)) {
			ps.setLong(1, roomId);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				Candidate c = new Candidate();
				c.setCandidateId(rs.getLong("candidate_Id"));
				c.setRoomId(rs.getLong("room_Id"));
				c.setName(rs.getString("name"));
				c.setDescription(rs.getString("description"));
				c.setPromise(rs.getString("promise"));
				c.setVoteCount(rs.getInt("vote_Count"));
				c.setCreatedAt(rs.getTimestamp("created_At").toLocalDateTime());
				list.add(c);
			}
		}catch (SQLException e){
			e.printStackTrace();
		}
		return list;
	}

	/*
	@Override
	public VoteHistory findVoteHistoryByRoomIdAndMemberId(Long roomId, Long memberId) throws SQLException {
		String sql = Room.FIND_VOTE_HISTORY_SQL;
		try (Connection conn = DatabaseUtil.getConnection();
			 PreparedStatement ps = conn.prepareStatement(sql)) {
			ps.setLong(1, roomId);
			ps.setLong(2, memberId);
			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				VoteHistory h = new VoteHistory();
				h.setHistoryId(rs.getLong("historyId"));
				h.setRoomId(rs.getLong("roomId"));
				h.setMemberId(rs.getLong("memberId"));
				h.setName(rs.getString("name"));
				h.setCreatedAt(rs.getTimestamp("createdAt"));
				return h;
			}
		}
		return null;
	}

	 */
}
