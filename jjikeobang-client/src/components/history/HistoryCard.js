import PercentageBar from "./PercentageBar";

function HsitoryCard({historyInfo}) {
    return (
        <div class="history-card">
        <div class="history-date">2024-01</div>
        <div class="history-name">{historyInfo.roomtitle}</div>
        <div class="history-winner">
            <div class="history-winner-number">1번</div>
            <div class="history-winner-name">김민수</div>
            <div class="history-winner-percent">45%</div>
        </div>
            {historyInfo.candidateInfos.map((candidate, index) => {
                return (
                    <div class="row">
                        <PercentageBar key={index} name={candidate.name} percentage={candidate.voteCount} />
                    </div>
                );
            })}
        <div class="text-end mt-3">
            <small>총 투표수: {historyInfo.totalEntryCount}</small>
        </div>
        </div>
    );
}

export default HsitoryCard;