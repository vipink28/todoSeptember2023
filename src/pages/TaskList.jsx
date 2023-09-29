import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import TaskContext from '../context/TaskContext';
import { dateFormat } from '../helper';

function TaskList(props) {
    const { allTasks } = useContext(TaskContext);
    return (
        <div className='container p-4 mt-5 bg-primary text-white'>
            <div className="d-flex">
                <h3>Task List</h3>
                <Link className='btn btn-info ms-auto' to="/create-task">Create Task</Link>
            </div>

            <div className='task-header d-flex mb-3 px-4 py-3'>
                <div className="task-id">Sr. No.</div>
                <div className="task-title">Title</div>
                <div className="task-desc">Description</div>
                <div className="task-duedate">Due Date</div>
                <div className="task-actions">Actions</div>
            </div>
            {
            allTasks?.map((task)=>{
                return(
            <div className='task-row d-flex align-items-center mb-3 rounded-3 px-4 py-3'>
                <div className="task-id px-2">{task.id}</div>
                <div className="task-title px-2">{task.title}</div>
                <div className="task-desc px-2">{task.description}</div>
                <div className="task-duedate px-2">{dateFormat(task.duedate)}</div>
                <div className="task-actions px-2">Actions</div>
            </div>
                )
            })            
            }


        </div>
    );
}

export default TaskList;