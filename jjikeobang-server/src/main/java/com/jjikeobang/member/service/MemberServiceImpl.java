package com.jjikeobang.member.service;

import com.jjikeobang.member.model.Member;
import com.jjikeobang.member.repository.MemberRepository;
import com.jjikeobang.member.repository.MemberRepositoryImpl;

import java.util.List;

public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    public MemberServiceImpl() {
        this.memberRepository = new MemberRepositoryImpl();
    }

    @Override
    public List<Member> selectAllMember() {
        return memberRepository.selectAllMember();
    }

    @Override
    public Member findById(int memberId) {
        return memberRepository.findById(memberId);
    }
}
