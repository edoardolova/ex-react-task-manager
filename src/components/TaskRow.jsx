import React from "react"
import { Link } from "react-router-dom"
import dayjs from "dayjs"

function TaskRow({task, checked, onToggle}){
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
                <td>
                    <input type="checkbox" className="me-2" checked={checked} onChange={()=>onToggle(task.id)} />
                    <Link to={`/task/${task.id}`} className="text-light">
                        {task.title}
                    </Link>
                </td>
                <td className={taskStatusColor(task.status)} >{task.status}</td>
                <td>{dayjs(task.createdAt).format('DD/MM/YYYY')}</td>
            </tr>
        </>
    )
}

export default React.memo(TaskRow);