import React from 'react'

export const Modal = ({idModal, title, message, onAceptClick, onCancelClick}) => (
    <div id={idModal} className="modal">
        <div className="modal-content">
            <h4>{title}</h4>
            <p>{message}</p>
        </div>
        <div className="modal-footer">
            <a href="javascript:void(0);" onClick={onCancelClick} className=" modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
            <a href="javascript:void(0);" onClick={onAceptClick} className=" modal-action modal-close waves-effect waves-green btn-flat">Acept</a>
        </div>
    </div>    
);