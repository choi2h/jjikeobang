package com.jjikeobang.member.repository;

import com.jjikeobang.member.model.Member;

import java.util.List;

public interface MemberRepository {
    String SELECT_MEMBER_SQL = "select * from member";

    List<Member> selectAllMember();
}
