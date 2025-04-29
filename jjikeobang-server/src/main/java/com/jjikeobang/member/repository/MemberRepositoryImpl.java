package com.jjikeobang.member.repository;

import com.jjikeobang.member.model.Member;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import static com.jjikeobang.common.JDBCTemplate.getConnection;
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

        return members;
    }
}
