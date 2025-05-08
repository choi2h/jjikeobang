package com.jjikeobang.vote.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import static com.jjikeobang.util.DatabaseUtil.Close;
import static com.jjikeobang.util.DatabaseUtil.getConnection;

public class VoteRepositoryImpl implements VoteRepository{

    @Override
    public void voteCandidate(long roomId, long candidateId) {
        Connection connection = getConnection();
        try(PreparedStatement pstmt = connection.prepareStatement(VOTE_SQL)){
            pstmt.setLong(1,candidateId);
            pstmt.setLong(2,roomId);
            if(pstmt.executeUpdate() > 0){
                connection.commit();
            }else{
                connection.rollback();
            }
        }catch (SQLException e){
            e.printStackTrace();
        }
        Close(connection);
    }
}
