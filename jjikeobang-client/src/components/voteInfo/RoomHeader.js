function RoomHeader({title, entryCode}) {
    return (
        <div className="room-header">
            <div>
                <h2 className="room-title">{title}</h2>
            </div>
            <div className="d-flex align-items-center">
                <span className="room-code-label">입장 코드:</span>
                <span className="room-code">{entryCode}</span>
                <button className="copy-btn ms-2">
                    <i className="bi bi-clipboard"></i> 복사
                </button>
            </div>
        </div>
    );
}

export default RoomHeader;