package com.jjikeobang.vote.model;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class VoteResultMap {
    private static Map<Long, VoteResult> voteResultMap = new ConcurrentHashMap<>();

    public static VoteResult get(Long roomId){
        return voteResultMap.get(roomId);
    }

    public static void put(Long roomId, VoteResult voteResult){
        voteResultMap.put(roomId,voteResult);
    }

    public static void remove(Long roomId){
        voteResultMap.remove(roomId);
    }
}
