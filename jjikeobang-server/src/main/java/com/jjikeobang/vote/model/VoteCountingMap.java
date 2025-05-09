package com.jjikeobang.vote.model;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class VoteCountingMap {
    private static Map<Long, VoteCounting> voteResultMap = new ConcurrentHashMap<>();

    public static VoteCounting get(Long roomId){
        return voteResultMap.get(roomId);
    }

    public static void put(Long roomId, VoteCounting voteCounting){
        voteResultMap.put(roomId, voteCounting);
    }

    public static void remove(Long roomId){
        voteResultMap.remove(roomId);
    }
}
