import { createContext, useContext } from "react";
import AuthContext from "./AuthContext";

const TaskContext = createContext();


export const TaskProvider = ({children})=>{
    const { message, setMessage } = useContext(AuthContext);
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
            setMessage("Task created Successfully")
        }else{
            setMessage("Something went wrong");
        }
    }

    return( 
    <TaskContext.Provider value={{
        createTask
    }}>
        {children}
    </TaskContext.Provider>
    )
}

export default TaskContext;