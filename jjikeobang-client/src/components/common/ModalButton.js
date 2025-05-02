import React from "react";

const getButton = (type, text, onClick, modalId) => {
    if(type === 'regist') {
        return <button className="btn btn-primary" onClick={onClick}>{text}</button>;
    } else if (type === 'modify') {
        return <button type="button" className="candidate-modify-btn" data-bs-toggle="modal" data-bs-target={modalId} onClick={onClick}>수정</button>;
    }

    return <div></div>
}

function ModalButton({type, text, onClick, modalId}){
    return (
        <>
            {getButton(type, text, onClick, modalId)}
        </>
    );
}

export default ModalButton;