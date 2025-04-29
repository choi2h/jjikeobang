function VoteStatusBoard ({label, content, color}) {
    const contentStyle = {
        fontSize: '1.5rem', 
        fontWeight: '600', 
        color
    }

    return (
        <div className="col-md-6 mb-3">
            <div className="vote-status">
                <div className="vote-count-label">{label}</div>
                {/* #1a4b8c */}
                <div style={contentStyle}>{content}</div>
            </div>
        </div>
    );
}

export default VoteStatusBoard;