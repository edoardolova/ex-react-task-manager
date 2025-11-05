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
        const foundedTask = tasks.find(t => t.title === task.title) 
        if (foundedTask !== undefined) {
            return Promise.reject(new Error("Nome già usato per un'altra task"));
        }
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
        const foundedTask = tasks.find(task => task.title === updatedTask.title && task.id !== updatedTask.id)
        if (updatedTask !== undefined) {
            return Promise.reject(new Error("Nome già usato per un'altra task"));
        }
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

    async function removeMultipleTasks(ids){
        const promises = ids.map(id =>{
            return fetch(`${apiUrl}/tasks/${id}`,{
                method:'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            })
            .then(res => res.json())
        })

        const results= await Promise.allSettled(promises)
        let successIds = [];
        let failedIds = [];

        results.forEach((result, index) => {
            if (result.status === "fulfilled") {
                successIds.push(ids[index]);       
            } 
            else {
                failedIds.push(ids[index]);        
            }
        });

        setTasks(prev => prev.filter(task => !successIds.includes(task.id)));

        if (failedIds.length > 0) {
            throw new Error(`Non è stato possibile eliminare le task con id: ${failedIds.join(", ")}`);
        }

        return successIds;
    }

    return {tasks, addTask, removeTask, updateTask, removeMultipleTasks}
}