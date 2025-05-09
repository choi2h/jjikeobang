import PercentageBar from "./PercentageBar";


function HistoryCard({historyInfo}) {
    const winningCandidate = historyInfo.candidateInfos.length === 0 ? {signNumber:0, name:'', voteCount:0} : 
        historyInfo.candidateInfos.reduce((max, candidate) => {
            return candidate.voteCount > max.voteCount ? candidate : max;
        });

    const getVoteRate = (voteAmount) => {
        if(!historyInfo.tototalVote || historyInfo.tototalVote <= 0) return 0;
        return Math.min(100, Math.max(1, Math.floor((voteAmount / historyInfo.totalEntryCount) * 100)));
    }
    return (
        <div class="history-card">
            <div class="history-date">{historyInfo.createdAt.split('T')[0]}</div>
            <div class="history-name">{historyInfo.roomTitle}</div>
        <div className="row">
            <div class="history-winner col-md-6">
                <div class="history-winner-title">당선자</div>
                <div class="history-winner-box">
                    <div class="history-name-box">
                        <div class="history-winner-number">{winningCandidate.signNumber}</div>
                        <div class="history-winner-name">{winningCandidate.name}</div>
                    </div>
                    <div class="history-winner-percent">{getVoteRate(winningCandidate.voteCount)}%</div>
                </div>
            </div>
            <div class="candidates col-md-6">
            <small style={{display: 'block', textAlign: 'right'}}>총 투표수: {historyInfo.totalEntryCount}</small>
                {!historyInfo || historyInfo.candidateInfos.length === 0 ? 
                    '후보자 정보가 없습니다.' :
                    historyInfo.candidateInfos.map((candidate, index) => {
                        return (
                            <div class="row">
                                <div class="history-canidate-box">
                                    <div class="history-name-box">
                                        <div class="history-canidate-number">{candidate.signNumber}</div>
                                        <div class="history-canidate-name">{candidate.name}</div>
                                    </div>
                                    <div class="history-canidate-name">{candidate.voteCount}표</div>
                                </div>
                            </div>
                        );
                })}
            </div>
        </div>
        </div>
    );
}

export default HistoryCard;
