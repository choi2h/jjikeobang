const getButton = (type, text, onClick) => {
    if(type === 'vote') {
        return <button className="btn vote-btn" onClick={onClick}>{text}</button>;
    } else if (type === 'cancle') {
        return <button className="btn cancel-btn" onClick={onClick}>{text}</button>;
    }

    return <div></div>
}

function Button({type, text, onClick}) {
    return (
        <div className="col-md-6 mb-3">
        {getButton(type, text, onClick)}
        </div>
    );
}

export default Button;