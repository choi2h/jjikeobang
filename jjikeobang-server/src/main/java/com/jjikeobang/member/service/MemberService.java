package com.jjikeobang.member.service;

import com.jjikeobang.member.model.JoinMemberDTO;
import com.jjikeobang.member.model.Member;

import java.util.List;

public interface MemberService {
    List<Member> selectAllMember();

    void putMember(JoinMemberDTO member);
    Member findById(int memberId);

    boolean isDuplicatedId(String userId);
}
