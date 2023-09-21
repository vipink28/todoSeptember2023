import React from 'react';
import TaskForm from '../components/TaskForm';

function CreateTask(props) {
    return (
        <div className='container-fluid h-100'>
            <div className="row h-100">
                <div className="col-lg-6 h-100 d-flex align-items-center justify-content-center bg-primary text-white flex-column">               
                    <TaskForm />                    
                </div>

                <div className="col-lg-6 h-100 d-flex align-items-center justify-content-center">
                    <div className="card auth-card">
                        <div className="card-body">
                            
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    );
}

export default CreateTask;