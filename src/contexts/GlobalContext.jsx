import { createContext, useEffect, useState, useContext } from "react";

const GlobalContext = createContext();

function GlobalProvider({children}){
    const apiUrl = import.meta.env.VITE_API_URL;
    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        fetch(`${apiUrl}/tasks`)
        .then(res => res.json())
        .then(data => setTasks(data))
    },[])

    return (
        <GlobalContext.Provider value={{ tasks }}>
            {children}
        </GlobalContext.Provider>
    );
}

function useGlobalContext() {
  return useContext(GlobalContext);
}

export { GlobalProvider, useGlobalContext };