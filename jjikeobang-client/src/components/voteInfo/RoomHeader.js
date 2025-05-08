function RoomHeader({title, entryCode}) {
    const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(entryCode);
          alert('입장코드가 클립보드에 복사되었습니다.');
        } catch (err) {
          console.error('입장코드 복사에 실패하였습니다.', err);
        }
      };
    
    return (
        <div className="room-header">
            <div>
                <h2 className="room-title">{title}</h2>
            </div>
            <div className="d-flex align-items-center">
                <span className="room-code-label">입장 코드:</span>
                <span className="room-code">{entryCode}</span>
                <button className="copy-btn ms-2" onClick={handleCopy}>
                    <i className="bi bi-clipboard"></i> 복사
                </button>
            </div>
        </div>
    );
}

export default RoomHeader;