package com.jjikeobang.member.service;

import com.jjikeobang.member.model.JoinMemberDTO;
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

    @Override
    public Member findByLoginId(String userId) {
        return memberRepository.findByLoginId(userId);
    }

    @Override
    public void putMember(JoinMemberDTO member) {
        memberRepository.putMember(member);
    }

    @Override
    public boolean checkIfDuplicated(String userId) {
        List<Member> members = memberRepository.selectAllMember();
        for (Member member : members) {
            if(userId.equals(member.getLoginId())){
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean checkUserInfo(String userId, String userPw) {
        Member member = memberRepository.findByLoginId(userId);
        if(member != null){
            return userPw.equals(member.getPassword());
        }else{
            return false;
        }
    }
}
