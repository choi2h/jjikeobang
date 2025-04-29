package com.jjikeobang.member.model;

import java.time.LocalDateTime;

public class Member {
    private Long id;
    private String loginId;
    private String password;
    private String name;
    private LocalDateTime createdAt;

    public Member(Long id, String loginId, String password, String name, LocalDateTime createdAt) {
        this.id = id;
        this.loginId = loginId;
        this.password = password;
        this.name = name;
        this.createdAt = createdAt;
    }

    public Member(String loginId, String password, String name, LocalDateTime createdAt) {
        this.loginId = loginId;
        this.password = password;
        this.name = name;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getLoginId() {
        return loginId;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    @Override
    public String toString() {
        return "Member{" +
                "id=" + id +
                ", loginId='" + loginId + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
