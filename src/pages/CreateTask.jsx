import React, { useContext, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskContext from '../context/TaskContext';
import { dateFormat } from '../helper';

function CreateTask(props) {
    const {latestTask} = useContext(TaskContext);
    const [isUpdate, setIsUpdate]=useState(false);
    const edit=()=>{
        setIsUpdate(true);
    }

    return (
        <div className='container-fluid h-100'>
            <div className="row h-100">
                <div className="col-lg-6 h-100 d-flex align-items-center justify-content-center bg-primary text-white flex-column">               
                    <TaskForm isUpdate={isUpdate} data={latestTask}/>                    
                </div>

                <div className="col-lg-6 h-100 d-flex align-items-center justify-content-center">                    
                    <div className="card bg-primary w-75">
                        <div className="card-body text-white">
                            <div className="d-flex">
                                <h3>{latestTask?.title}</h3>
                                <button className='btn btn-info ms-auto' onClick={edit}>Edit</button>
                            </div>
                            <p>{latestTask?.description}</p>
                            <div className="d-flex">
                                <p>Modiefied On: { dateFormat(latestTask?.modifiedon)}</p>
                                <p className='ms-auto'>Due On: {dateFormat(latestTask?.duedate)}</p>
                            </div>
                        </div>
                    </div>

                </div>                
            </div>
        </div>
    );
}

export default CreateTask;