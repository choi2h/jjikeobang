package com.jjikeobang.member.repository;

import com.jjikeobang.member.model.Member;

import java.util.List;

public interface MemberRepository {
    String SELECT_MEMBER_SQL = "select * from member";
    String SELECT_MEMBER_BY_ID_SQL = "select * from member where member_id=?";

    List<Member> selectAllMember();

    Member findById(int memberId);
}
