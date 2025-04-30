package com.jjikeobang.member.repository;

import com.jjikeobang.member.model.JoinMemberDTO;
import com.jjikeobang.member.model.Member;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import static com.jjikeobang.common.JDBCTemplate.*;
import static com.jjikeobang.common.TypeMapperUtil.stringToLocalDateTime;

public class MemberRepositoryImpl implements MemberRepository {

    @Override
    public List<Member> selectAllMember() {
        List<Member> members = new ArrayList<>();

        Connection connection = getConnection();
        try (Statement stm  = connection.createStatement();
            ResultSet rs = stm.executeQuery(SELECT_MEMBER_SQL)) {

            while (rs.next()) {
                members.add(new Member(
                        rs.getLong(1),
                        rs.getString(2),
                        rs.getString(3),
                        rs.getString(4),
                        stringToLocalDateTime(rs.getString(5))
                ));
            }
        } catch (SQLException se) {
            se.printStackTrace();
        }
        Close(connection);

        return members;
    }

    @Override
    public void putMember(JoinMemberDTO member) {
        Connection connection = getConnection();
        try(PreparedStatement pstmt = connection.prepareStatement(INSERT_MEMBER_SQL)){
            pstmt.setString(1, member.loginId());
            pstmt.setString(2, member.password());
            pstmt.setString(3, member.name());

            pstmt.executeUpdate();
            commit(connection);
        }catch (SQLException se){
            se.printStackTrace();
        }
        Close(connection);

    }

    @Override
    public Member findById(int memberId) {
        Member member = null;

        Connection connection = getConnection();
        try(PreparedStatement pstmt = connection.prepareStatement(SELECT_MEMBER_BY_ID_SQL)){
            pstmt.setInt(1, memberId);
            ResultSet rs = pstmt.executeQuery();

            member = new Member(
                    rs.getLong(1),
                    rs.getString(2),
                    rs.getString(3),
                    rs.getString(4),
                    stringToLocalDateTime(rs.getString(5))
            );
        }catch (SQLException se){
            se.printStackTrace();
        }
        Close(connection);

        return member;
    }
}
