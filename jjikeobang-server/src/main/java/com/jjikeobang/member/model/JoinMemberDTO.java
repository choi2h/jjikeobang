package com.jjikeobang.member.model;

import java.time.LocalDateTime;

public record JoinMemberDTO (
        String loginId,
        String password,
        String name
) {}
