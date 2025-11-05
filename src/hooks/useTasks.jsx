import { useEffect, useReducer } from "react";
import tasksReducer from "../reducers/taskReducer";

export default function useTasks(){
    const apiUrl = import.meta.env.VITE_API_URL;
    const [tasks, dispatchtask] = useReducer(tasksReducer, []);

    useEffect(() => {
        fetch(`${apiUrl}/tasks`)
            .then(res => res.json())
            .then(data => dispatchtask({ type: 'LOAD_TASKS', payload: data }))
            .catch(err => console.error(err));
    }, []);

    function addTask(task) {
        const exists = tasks.find(t => t.title === task.title);
        if (exists) {
            return Promise.reject(new Error("Nome già usato per un'altra task"));
        }

        return fetch(`${apiUrl}/tasks`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task)
        })
        .then(res => res.json())
        .then(data => {
            if (!data.success) throw new Error(data.message);
            dispatchtask({ type: 'ADD_TASK', payload: data.task });
            return data.task;
        });
    }

    function removeTask(id) {
        return fetch(`${apiUrl}/tasks/${id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())
        .then(data => {
            if (!data.success) throw new Error(data.message);
            dispatchtask({ type: 'REMOVE_TASK', payload: id });
            return data.task;
        });
    }

    function updateTask(updatedTask) {
        const exists = tasks.find(t => t.title === updatedTask.title && t.id !== updatedTask.id);
        if (exists) {
            return Promise.reject(new Error("Nome già usato per un'altra task"));
        }

        return fetch(`${apiUrl}/tasks/${updatedTask.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask)
        })
        .then(res => res.json())
        .then(data => {
            if (!data.success) throw new Error(data.message);
            dispatchtask({ type: 'UPDATE_TASK', payload: data.task });
            return data.task;
        });
    }

    async function removeMultipleTasks(ids) {
        const promises = ids.map(id =>
            fetch(`${apiUrl}/tasks/${id}`, { method: 'DELETE' })
                .then(res => res.json())
        );

        const results = await Promise.allSettled(promises);

        const successIds = [];
        const failedIds = [];

        results.forEach((result, index) => {
            if (result.status === "fulfilled") successIds.push(ids[index]);
            else failedIds.push(ids[index]);
        });

        dispatchtask({ type: 'REMOVE_MULTIPLE_TASKS', payload: successIds });

        if (failedIds.length > 0) {
            throw new Error(`Non è stato possibile eliminare: ${failedIds.join(", ")}`);
        }

        return successIds;
    }

    return { tasks, addTask, removeTask, updateTask, removeMultipleTasks };
}
