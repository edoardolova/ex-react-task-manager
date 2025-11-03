import TaskRow from "../components/TaskRow"
import { useGlobalContext } from "../contexts/GlobalContext"
import { useMemo } from "react";

export default function TaskList(){
    const {tasks} = useGlobalContext();

    
    const tableRows = useMemo(() => {
        return tasks.map(task => <TaskRow key={task.id} task={task} />);
    }, [tasks]); 
    return(
        <>
        <div className="container">

            <h1 className="text-center fw-semibold text-light">TASKS</h1>
            <table className="table table-dark table-hover ">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Stato</th>
                        <th scope="col">Data di creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}

                </tbody>
            </table>

        </div>
        </>
    )
}