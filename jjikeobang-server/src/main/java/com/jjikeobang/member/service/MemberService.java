package com.jjikeobang.member.service;

import com.jjikeobang.member.model.Member;

import java.util.List;

public interface MemberService {
    List<Member> selectAllMember();

    Member findById(int memberId);
}
