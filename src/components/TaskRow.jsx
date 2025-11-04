import React from "react"
import { Link } from "react-router-dom"

function TaskRow({task}){
    function taskStatusColor(status){
        switch (status) {
            case "To do":
                return 'text-danger'
            case "Doing":
                return 'text-warning'
            case "Done":
                return 'text-success'
            default:
                return 'text-danger'
        }
    }
    return(
        <>
            <tr>
                <td><Link to={`/task/${task.id}`} className="text-light">{task.title}</Link></td>
                <td className={taskStatusColor(task.status)} >{task.status}</td>
                <td>{new Date(task.createdAt).toLocaleString()}</td>
            </tr>
        </>
    )
}

export default React.memo(TaskRow);