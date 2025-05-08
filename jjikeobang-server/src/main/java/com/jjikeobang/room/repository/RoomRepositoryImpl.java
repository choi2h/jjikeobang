package com.jjikeobang.room.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.jjikeobang.room.model.Room;
import static com.jjikeobang.util.DatabaseUtil.Close;
import static com.jjikeobang.util.DatabaseUtil.getConnection;
import static com.jjikeobang.util.DatabaseUtil.commit;
import static com.jjikeobang.util.DatabaseUtil.rollback;

public class RoomRepositoryImpl implements RoomRepository {
	
	@Override
	public Room insertRoom(Room room) throws SQLException {
		
		Connection conn = getConnection();
		
		try (PreparedStatement psmt = conn.prepareStatement(INSERT_ROOM_SQL, 
															Statement.RETURN_GENERATED_KEYS)) {
	            
			psmt.setString(1, room.getName());
			psmt.setInt(2, room.getMaxParticipant());
			psmt.setInt(3, room.getVoteDuration());
			psmt.setString(4, room.getEntryCode());
			psmt.setLong(5, room.getCreateMemberId());
	            
		    int res = psmt.executeUpdate();
		
		    if (res > 0) {
		    	commit(conn);
		    	
		    	ResultSet rs = psmt.getGeneratedKeys();
		        
		    	if (rs.next()) {
		            room.setRoomId(rs.getLong(1));
		        }
		    }else {
		    	rollback(conn);
		    	throw new SQLException();
		    }
		    
		} catch (SQLException e) {
			rollback(conn);
		    e.printStackTrace();
		    throw e;
		} finally {
			Close(conn);
		}
		
		return room;
	}

	@Override
	public Room findById(long roomId) {
		Connection conn = getConnection();
		try (PreparedStatement psmt = conn.prepareStatement(SELECT_ROOM_SQL)){
			
			psmt.setLong(1, roomId);
			ResultSet rs = psmt.executeQuery();
					
			if(rs.next()) {
				return new Room(
						rs.getLong(1),
                        rs.getString(2),
                        rs.getInt(3),
                        rs.getInt(4),
                        rs.getString(5),
                        rs.getInt(6),
                        rs.getInt(7));
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			Close(conn);
		}
		
		return null;
	}

	@Override
	public Room findByEntryCode(String entryCode) {
		Connection conn = getConnection();
		try (PreparedStatement psmt = conn.prepareStatement(SELECT_ROOM_BY_ENTRY_CODE)){

			psmt.setString(1, entryCode);
			ResultSet rs = psmt.executeQuery();

			if(rs.next()) {
				return new Room(
						rs.getLong(1),
						rs.getString(2),
						rs.getInt(3),
						rs.getInt(4),
						rs.getString(5),
						rs.getInt(6),
						rs.getInt(7));
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			Close(conn);
		}

		return null;
	}

	@Override
	public int updateRoomParticipant(Long roomId) {
		Connection conn = getConnection();
		try (PreparedStatement psmt = conn.prepareStatement(UPDATE_ROOM_PARTICIPANTS)){
			psmt.setLong(1, roomId);
			return psmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			Close(conn);
		}

		return 0;
	}
}
