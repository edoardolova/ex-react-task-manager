import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useGlobalContext } from "../contexts/GlobalContext";
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";
export default function TaskDetail(){
    const { id } = useParams();
    const { tasks, removeTask, updateTask } = useGlobalContext();
    const [task, setTask] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const foundTask = tasks.find(task => task.id === Number(id));
        setTask(foundTask);
    }, [id, tasks]);

    function handleDelete() {
        setShowModal(true);
    }

    function confirmDelete() {
        removeTask(id)
        .then(() => {
            alert('Task eliminata con successo');
            navigate('/');
        })
        .catch(err => alert('Errore ' + err.message));
    }

    function handleSave(updatedTask) {
        updateTask(updatedTask)
        .then(() => {
            alert("Task modificata con successo!");
            setShowEditModal(false);
        })
        .catch(err => alert("Errore: " + err.message));
    }

    return (
        <>
            <div className="container">
                {task ? (
                    <div className="card bg-dark text-light mt-5">
                        <div className="card-header">
                            <p className="mb-0">Creato: {new Date(task.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="card-body">
                            <div className="d-flex mb-2">
                                <h3 className="card-title me-3">{task.title}</h3>
                                <p className="card-text fw-bold my-auto">({task.status})</p>
                            </div>
                            <p className="card-text">{task.description}</p>

                            <button className="btn btn-warning me-2" onClick={() => setShowEditModal(true)}>
                                Modifica
                            </button>
                            <button className="btn btn-danger" onClick={handleDelete}>
                                Elimina
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-light mt-5">La task non esiste più.</p>
                )}
            </div>

            {/* modale eliminazione */}
            <Modal 
                title="Conferma eliminazione"
                content="Sei sicuro di voler eliminare questa task?"
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmDelete}
            />

            {/* modale modifica */}
            {task && (
                <EditTaskModal
                    show={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    task={task}
                    onSave={handleSave}
                />
            )}
        </>
    );
}
