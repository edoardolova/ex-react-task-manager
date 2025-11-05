import TaskRow from "../components/TaskRow";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useCallback, useMemo, useState } from "react";

export default function TaskList() {
    const { tasks, removeMultipleTasks } = useGlobalContext();

    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTaskIds , setSelectedTaskIds ] = useState([])


    function toggleSelection(taskId) {
        setSelectedTaskIds (prev =>
            prev.includes(taskId)
                ? prev.filter(id => id !== taskId) 
                : [...prev, taskId] 
        );
    }


    function debounce(callback, delay) {
        let timeout;
        return (value) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                callback(value);
            }, delay);
        };
    }

    const debouncedSearch = useCallback(debounce((value) => setSearchQuery(value), 300), []);

    function handleSearch(e) {
        debouncedSearch(e.target.value); 
    }

    function checkSort(sortType) {
        if (sortType === sortBy) {
            setSortOrder((prev) => prev * -1);
        } else {
            setSortBy(sortType);
            setSortOrder(1);
        }
    }

    function getSortIcon(column) {
        if (sortBy !== column){
            return null
        };

        return sortOrder > 0
            ? <i className="bi bi-arrow-down"></i>
            : <i className="bi bi-arrow-up"></i>;
    }

    const sortedTasks = useMemo(() => {
        const filtered = tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()));

        const sorted = [...filtered];

        sorted.sort((a, b) => {
            if (sortBy === "title") {
                return a.title.localeCompare(b.title) * sortOrder;
            }
            if (sortBy === "status") {
                const statusOrder = { "To do": 0, "Doing": 1, "Done": 2 };
                return (statusOrder[a.status] - statusOrder[b.status]) * sortOrder;
            }
            return (new Date(a.createdAt) - new Date(b.createdAt)) * sortOrder;
        });

        return sorted;
    }, [tasks, sortBy, sortOrder, searchQuery]);

    return (
        <div className="container">
            <h1 className="text-center fw-semibold text-light py-2">TASKS</h1>
            <div className="d-flex">
                <input
                    placeholder="Cerca per nome..."
                    type="text"
                    className="form-control mb-3"
                    onChange={handleSearch}
                />
                {selectedTaskIds.length > 0 && (
                    <button
                        className="btn btn-danger ms-3"
                        onClick={() => {
                            removeMultipleTasks(selectedTaskIds)
                                .then(() => {
                                    alert("Task eliminate con successo");
                                    setSelectedTaskIds([]);
                                })
                                .catch(err => {
                                    alert(err.message);
                                });
                        }}
                    >
                        Elimina selezionate
                    </button>

                )}

            </div>

            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th scope="col" onClick={() => checkSort("title")}>
                            Nome {getSortIcon("title")}
                        </th>
                        <th scope="col" onClick={() => checkSort("status")}>
                            Stato {getSortIcon("status")}
                        </th>
                        <th scope="col" onClick={() => checkSort("createdAt")}>
                            Data di creazione {getSortIcon("createdAt")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTasks.map((task) => (
                        <TaskRow key={task.id} task={task} checked={selectedTaskIds.includes(task.id)} onToggle={toggleSelection} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
