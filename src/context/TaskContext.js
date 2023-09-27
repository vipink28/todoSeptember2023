import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const TaskContext = createContext();


export const TaskProvider = ({children})=>{
    const { message, setMessage, user } = useContext(AuthContext);
    const [allTasks, setAllTasks]=useState(null);
    const [recentTasks, setRecentTasks]=useState(null);
    const [latestTask, setLatestTask]=useState(null);

    const createTask = async(formData)=>{
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
        const response = await fetch(`http://localhost:5000/tasks`, config);
        if(response.status === 201){
            setMessage("Task created Successfully");
            getTasks();
        }else{
            setMessage("Something went wrong");
        }
    }

    const getTasks=async(userid)=>{
        const response = await fetch(`http://localhost:5000/tasks?userid=${user.id}`, {method: "GET"});
        const tasks = await response.json();
        setAllTasks(tasks);
        const recent = tasks.slice(-3);
        setRecentTasks(recent);
        const latest = tasks[tasks.length - 1];
        setLatestTask(latest);
    }

    useEffect(()=>{
        if(user){
            getTasks();
        }       
    }, [user]);

    return( 
    <TaskContext.Provider value={{
        createTask,
        latestTask,
        recentTasks,
        allTasks
    }}>
        {children}
    </TaskContext.Provider>
    )
}

export default TaskContext;