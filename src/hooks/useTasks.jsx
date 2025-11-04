import { useEffect, useState } from "react";


export default function useTasks(){
    const apiUrl = import.meta.env.VITE_API_URL;
    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        fetch(`${apiUrl}/tasks`)
        .then(res => res.json())
        .then(data => setTasks(data))
    },[])

    function addTask(task){
        console.log(task)
        return fetch(`${apiUrl}/tasks`,{
            method:'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success === true) {
                setTasks(prev => [...prev, data.task])
                return data.task;
            }
            else{
                throw new Error(data.message)
            }
        })
    }
    function removeTask(){
        console.log('removeTask')
    }
    function updateTask (){
        console.log('updateTask')
    }

    return {tasks, addTask, removeTask, updateTask}
}