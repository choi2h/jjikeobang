function PercentageBar({name, percentage}) {
    return (
        <>
            <div class="col-md-6">
                <div class="mb-2">{name}</div>
                <div class="progress mb-3">
                    <div class="progress-bar bg-primary" role="progressbar" style={{ width: `${percentage}%` }}
                        aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
            <div class="col-md-6 text-end">
                <div>{percentage}%</div>
            </div>
        </>
    );
}

export default PercentageBar;