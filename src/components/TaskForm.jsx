import React, { useContext, useEffect, useState, useTransition } from 'react';
import TaskContext from '../context/TaskContext';
import AuthContext from '../context/AuthContext';

function TaskForm(props) {
    const init = {
        title: "",
        description: "",
        duedate: ""
    }

    const { isUpdate, data, onCancel } = props;
    const { createTask, updateTask } = useContext(TaskContext);
    const { message, setMessage, user } = useContext(AuthContext);
    const [formData, setFormData]=useState(init);
    
    useEffect(()=>{
        setMessage("");
    }, [])

    useEffect(()=>{
        if(isUpdate){
            setFormData(data);
        }else{
            setFormData(init);
        }
    }, [isUpdate])


    const submitCancel=(e)=>{
        e.preventDefault();
        onCancel();
    }

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: value,
            userid: user.id,
            modifiedon: Date()
        }))
    }

    const submitForm=(e)=>{
        e.preventDefault();
        createTask(formData);
        setFormData(init);
    }

    const submitUpdate=(e)=>{
        e.preventDefault();
        updateTask(formData);
    }
    return (
        <div className='p-3 w-50'>
            <h2 className='fs-3 text-white'>{isUpdate ? "Update Task":"Create Task"}</h2>

            <div className='card p-3'>
                <form>
                    <div className='mb-3'>
                        <label htmlFor="title">Title</label>
                        <input type="text" name='title' id='title' className='form-control' value={formData.title} onChange={handleChange}/>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="description">Description</label>
                        <textarea className='form-control' name='description' id='description' onChange={handleChange} value={formData.description}></textarea>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="duedate">Due Date</label>
                        <input type="datetime-local" name='duedate' id='duedate' className='form-control' onChange={handleChange} value={formData.duedate}/>
                    </div>
                    <p>{message}</p>
                    {
                    isUpdate ? <>
                    <button className='btn btn-primary me-2' onClick={submitUpdate}>Update Task</button>
                    <button className='btn btn-warning' onClick={submitCancel}>Cancel</button>
                    </> :
                    <button className='btn btn-primary' onClick={submitForm}>Create Task</button>
                    }
                </form>
            </div>
        </div>
    );
}

export default TaskForm;