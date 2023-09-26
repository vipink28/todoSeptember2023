import React, { useContext } from 'react';
import TaskForm from '../components/TaskForm';
import TaskContext from '../context/TaskContext';

function CreateTask(props) {
    const {latestTask} = useContext(TaskContext);

    return (
        <div className='container-fluid h-100'>
            <div className="row h-100">
                <div className="col-lg-6 h-100 d-flex align-items-center justify-content-center bg-primary text-white flex-column">               
                    <TaskForm />                    
                </div>

                <div className="col-lg-6 h-100 d-flex align-items-center justify-content-center">
                    
                    <div className="card bg-primary w-50">
                        <div className="card-body text-white">
                            <div className="d-flex">
                                <h3>{latestTask?.title}</h3>
                                <button className='btn btn-info ms-auto'>Edit</button>
                            </div>
                            <p>{latestTask?.description}</p>
                            <div className="d-flex">
                                <p>Modiefied On: {latestTask?.modifiedon}</p>
                                <p className='ms-auto'>Due On: {latestTask?.duedate}</p>
                            </div>
                        </div>
                    </div>

                </div>                
            </div>
        </div>
    );
}

export default CreateTask;