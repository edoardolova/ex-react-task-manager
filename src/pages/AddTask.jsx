import { useRef, useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";

const symbols = `!@#$%^&*()-_=+[]{}|;:'",.<>?/\\\`~`;
const status = [
    'To do',
    'Doing',
    'Done',
];

export default function AddTask(){
    const [title, setTitle] = useState('')
    const stateRef = useRef('To do')
    const descriptionRef = useRef('')
    const {addTask} = useGlobalContext()

    function isValidTitle(title){
        if (title.trim().length === 0 || [...title].some(char => symbols.includes(char))) {
            return false
        }
        return true
    }

    function handleSubmit(e){
        e.preventDefault();
        if (!isValidTitle(title)) {
            return alert('nome task non valido')
        }
        const newTask = {
            title: title,
            status: stateRef.current.value,
            description: descriptionRef.current.value,
        }
        addTask(newTask)
        .then(()=>{
            alert('task creata con successo')
            resetForm()
        })
        .catch(err => alert('errore: ' + err.message))

    }

    function resetForm(){
        setTitle('');
        stateRef.current.value = 'To do';
        descriptionRef.current.value = '';
    }
    return(
        <div className="container">
            <h1 className="text-center text-light fs-3 py-4">Add Task</h1>

            <form className="row g-3" onSubmit={(e)=>handleSubmit(e)}>
                {/* title  */}
                <div className="mb-3 col-12 col-md-8">
                    <label  className="form-label text-light">Nome task</label>
                    <input 
                        type="text" value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        className={`form-control ${isValidTitle(title) ? 'is-valid' : 'is-invalid'}`} 
                        id="title" 
                        placeholder="Fare la spesa..."
                    />
                </div>
                <div className="col-12 col-md-4">
                    <label  className="form-label text-light">Status</label>
                    <select id="inputState" className="form-select" ref={stateRef}>
                        {status.map(stat =>{
                            return(
                                <option key={stat} >{stat}</option>
                            )
                        })}
                    </select>
                </div>

                <div className="col-12">
                    <label className="form-label text-light">Descrizione</label>
                    <textarea ref={descriptionRef} className="form-control" id="description" placeholder="Prendere le uova..."/>
                </div>

                <button type="submit" className="btn btn-primary w-25 mx-auto">Submit</button>
            </form>

        </div>
    )
}