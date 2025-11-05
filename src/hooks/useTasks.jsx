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
    function removeTask(id){
        console.log('removedTask', id)
        return fetch(`${apiUrl}/tasks/${id}`,{
            method:'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.success === true){
                setTasks(prev => prev.filter(task => task.id !== Number(id)));

                return data.task
            }
            else{
                throw new Error(data.message)
            }
        })
    }
    function updateTask (updatedTask){
        console.log('updateTask')
        return fetch(`${apiUrl}/tasks/${updatedTask.id}`,{
            method:'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTask)
        })
        .then(res => res.json())
        .then(data => {
            if (data.success === true) {
                const updatedTasks = [...tasks].map(task=>{
                    if (task.id === updatedTask.id) {
                        return data.task
                    }
                    return task;
                })
                setTasks(updatedTasks)
                return data.task;
            }
            else{
                throw new Error(data.message)
            }
        })
    }

    return {tasks, addTask, removeTask, updateTask}
}