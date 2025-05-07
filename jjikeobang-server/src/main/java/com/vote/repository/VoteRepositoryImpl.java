package com.vote.repository;

import com.jjikeobang.candidate.model.Candidate;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import static com.jjikeobang.util.DatabaseUtil.*;

public class VoteRepositoryImpl implements VoteRepository{
    @Override
    public void updateCandidate(Candidate candidate) {
        Connection connection = getConnection();
        try(PreparedStatement pstmt = connection.prepareStatement(VOTE_CANDIDATE_SQL)){
            pstmt.setLong(1, candidate.getCandidateId());
            if(pstmt.executeUpdate() > 0){
                connection.commit();
            }else{
                connection.rollback();
            }
        }catch (SQLException e) {
            e.printStackTrace();
        }
        Close(connection);
    }

    @Override
    public Candidate findById(long roomId, long candidateId) {
        Connection connection = getConnection();
        Candidate candidate = null;
        try(PreparedStatement pstmt = connection.prepareStatement(FIND_BY_ID_SQL)){
            pstmt.setLong(1, roomId);
            pstmt.setLong(2, candidateId);
            ResultSet rs = pstmt.executeQuery();
            if(rs.next()){
                candidate = new Candidate(
                        rs.getLong(1),
                        rs.getLong(2),
                        rs.getString(3),
                        rs.getString(4),
                        rs.getString(5),
                        rs.getInt(6),
                        rs.getTimestamp(7).toLocalDateTime()
                );
                return candidate;
            }
        }catch (SQLException e){
            e.printStackTrace();
        }
        Close(connection);
        return candidate;
    }
}
