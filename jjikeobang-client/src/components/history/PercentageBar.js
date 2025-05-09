function PercentageBar({name, percentage}) {
    return (
        <>
            <div class="col-md-12">
                <div class="mb-2">{name}</div>
                <div className="d-flex justify-content-center align-items-center mb-3">
                <div className="progress flex-grow-1" style={{ height: '20px' }}>
                    <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: `${percentage}%` }}
                        aria-valuenow={percentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    ></div>
                    </div>
                    <div class="col-md-1" style={{ minWidth: '60px', textAlign: 'right' }}>
                        <div>{percentage}%</div>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default PercentageBar;