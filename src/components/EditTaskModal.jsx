import { useRef, useState, useEffect } from "react"
import Modal from "./Modal"

const statuses = ["To do", "Doing", "Done"];
const symbols = `!@#$%^&*()-_=+[]{}|;:'",.<>?/\\\`~`;

export default function EditTaskModal({ show, onClose, task, onSave }) {
    
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);
    const editFormRef = useRef(null);

    useEffect(() => {
        if (show && task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        }
    }, [show, task]);

    function isValidTitle(title){
        if (title.trim().length === 0 || [...title].some(char => symbols.includes(char))) {
            return false
        }
        return true
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!isValidTitle(title)) {
            alert("Il titolo non è valido");
            return; 
        }
        onSave({
            ...task,
            title,
            description,
            status
        });
        onClose(); 
    }

    return (
        <Modal
            title="Modifica Task"
            show={show}
            onClose={onClose}
            confirmText="Salva"
            onConfirm={() => editFormRef.current.requestSubmit()}
            content={
                <form className="row g-3" ref={editFormRef} onSubmit={handleSubmit}>
                    
                    <div className="mb-3 col-12 col-md-8">
                        <label className="form-label text-light">Nome task</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className={`form-control ${isValidTitle(title) ? 'is-valid' : 'is-invalid'}`}
                            placeholder="Fare la spesa..."
                        />
                    </div>

                    <div className="col-12 col-md-4">
                        <label className="form-label text-light">Status</label>
                        <select
                            className="form-select"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                        >
                            {statuses.map(state => (
                                <option key={state}>{state}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12">
                        <label className="form-label text-light">Descrizione</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="form-control"
                            placeholder="Prendere le uova..."
                        />
                    </div>

                </form>
            }
        />
    );
}
