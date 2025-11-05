import { createPortal } from "react-dom" 

export default function Modal({ title, content, show, onClose, onConfirm, confirmText = 'Conferma' }) {
    
    if (!show){ 
        return null
    };

    return createPortal(
        (
            <div className="modal-backdrop">
                <div className="modal" tabIndex="-1" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark text-light">
                            <div className="modal-header">
                                <h5 className="modal-title">{title}</h5>
                                <button type="button" className="btn-close" onClick={onClose}></button>
                            </div>
                            <div className="modal-body">
                                {content}
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={onClose} className="btn btn-secondary">Annulla</button>
                                <button type="button" onClick={onConfirm} className="btn btn-danger">{confirmText}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
        document.getElementById("modal-root") 
    );
}
