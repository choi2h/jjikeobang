const getButton = (type, text, onClick) => {
    if(type === 'vote') {
        return <button className="btn vote-btn" onClick={onClick}>{text}</button>;
    } else if (type === 'cancle') {
        return <button className="btn cancel-btn" onClick={onClick}>{text}</button>;
    } else if (type === 'primary') {
        return <button className="btn btn-primary" onClick={onClick}>{text}</button>;
    } else if (type === 'createRoom') {
        return <button type="button" className="btn create-room-btn" onClick={onClick}>{text}</button>
    } else if (type === 'modify') {
        return <button type="button" className="candidate-modify-btn" onClick={onClick}>수정</button>;
    } else if (type === 'delete') {
        return <button type="button" className="candidate-delete-btn" onClick={onClick}>삭제</button>;
    }

    return <div></div>
}

function Button({type, text, onClick}) {
    return (
        <>
            {getButton(type, text, onClick)}
        </>
    );
}

export default Button;