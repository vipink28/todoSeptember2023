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
            setTimeout(()=>{
                setMessage("");
            }, 3000)
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

    const updateTask=async(formData)=>{
        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
        const response = await fetch(`http://localhost:5000/tasks/${formData.id}`, config);
        if(response.ok){
            setMessage("Task updated successfully");
            getTasks();
            setTimeout(()=>{
                setMessage("");
            }, 3000)
        }else{
            setMessage("Something went wrong");
        }
    }

    const deleteTask = async(id)=>{
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {method:"DELETE"});
        if(response.ok){
            setMessage("User Deleted Successfully");
            getTasks();
        }else{
            setMessage("Something went wrong");
        }
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
        allTasks,
        updateTask,
        deleteTask
    }}>
        {children}
    </TaskContext.Provider>
    )
}

export default TaskContext;