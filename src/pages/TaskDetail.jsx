import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useGlobalContext } from "../contexts/GlobalContext";

export default function TaskDetail(){
    const {id} = useParams();
    const {tasks, removeTask} = useGlobalContext()
    const [task, setTask] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        const foundTask = tasks.find(task => task.id === Number(id))
        setTask(foundTask)
    },[id,tasks])

    function handleDelete(id){
        removeTask(id)
        .then(()=>{
            alert('Task eliminata con successo')
            navigate('/')
        })
        .catch(err => alert('Errore ' + err.message))
    }

    return(
        <>
            <div className="container">
                {task ? (
                    <div className="card bg-dark text-light mt-5">
                        <div className="card-header">
                            <p className="mb-0">Creato: {task.createdAt}</p>
                        </div>
                        <div className="card-body">
                            <div className="d-flex mb-2">
                                <h3 className="card-title me-3">{task.title}</h3>
                                <p className="card-text fw-bold my-auto">({task.status})</p>
                            </div>
                            <p className="card-text">{task.description}</p>
                            <button className="btn btn-outline-danger" onClick={()=>handleDelete(id)}> elimina</button>
                        </div>
                    </div>
                ) : (
+                   <p className="text-light mt-5">La task non esiste più.</p>)
                }
+               
            </div>
        </>
    )
}