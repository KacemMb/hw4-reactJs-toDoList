import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddTask from './AddTask';
import '../css/ToDoList.css';
import { deleteTask, toggleTask, updateTask } from '../Redux/ToDoSlice';

const ToDoList = () => {
  // Selecting the list of tasks from the Redux store
  const myData = useSelector(state => state.ToDoSlice.value);
  const dispatch = useDispatch();

  // Function to handle toggling the 'isDone' property of a task
  const handleToggle = (id) => {
    dispatch(toggleTask(id));
  };

  // Function to handle deleting a task
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  // Function to handle editing a task
  const handleEdit = (id) => {
    // Prompt the user to enter the new title for the task
    const newTitle = prompt("Enter your modification");
    if (newTitle !== null) { // Check if the user cancelled the prompt
      // Dispatch the updateTask action with the new title
      dispatch(updateTask({ id: id, title: newTitle }));
    }
  };

  return (
    <div className='ToDoList'>
      {/* Rendering each task */}
      {myData.map(item => (
        <div key={item.id} className={`task ${item.isDone ? "done" : "not-done"}`}>
          <div className='leftSide'>
            {/* Checkbox to toggle the completion status of the task */}
            <input
              type="checkbox"
              name="isDone"
              id={`isDone_${item.id}`}
              checked={item.isDone}
              onChange={() => handleToggle(item.id)}
            />
            <label htmlFor={`isDone_${item.id}`}>
              <h2>{item.title}</h2>
            </label>
          </div>
          
          <div className='edit'>
            {/* Button to edit the task */}
            <button className='editBtn' onClick={() => handleEdit(item.id)}>Edit</button>
            {/* Button to delete the task */}
            <button className='editBtn' onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        </div>
      ))}
      {/* Component to add a new task */}
      <AddTask />
    </div>
  );
};

export default ToDoList;