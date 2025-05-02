package com.jjikeobang.member.repository;

import com.jjikeobang.member.model.JoinMemberDTO;
import com.jjikeobang.member.model.Member;

import java.util.List;

public interface MemberRepository {
    String SELECT_MEMBER_SQL = "select * from member";
    String SELECT_MEMBER_BY_ID_SQL = "select * from member where member_id=?";

    String SELECT_MEMBER_BY_LOGIN_ID_SQL = "select * from member where login_id=?";
    String INSERT_MEMBER_SQL = "insert into member(login_id,password,name,created_at) values (?,?,?,now())";

    List<Member> selectAllMember();

    void insertMember(JoinMemberDTO member);

    Member findById(int memberId);

    Member findByLoginId(String userId);
}
