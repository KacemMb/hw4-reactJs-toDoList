import React, { useState } from 'react';
import '../css/AddTask.css';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import { useDispatch} from 'react-redux';
import { addTask } from '../Redux/ToDoSlice'; // Import addTask action creator

const AddTask = () => {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("");

  const handleTitleChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = () => {
    if (newTask.trim() === "") {
      alert("Please enter a task.");
    } else {
      const newTaskObject = {
        id: uuidv4(), // Generate a unique ID using UUID
        title: newTask,
        isDone: false
      };
      dispatch(addTask(newTaskObject)); // Dispatch addTask action with the new task object
      setNewTask(""); // Clear input field after submission
    }
  };

  return (
    <div className='AddTask'>
      <div className="form__group field">
        <input
          type="text"
          className="form__field"
          placeholder="Name"
          name="name"
          id="name"
          value={newTask}
          onChange={handleTitleChange}
          required
        />
        <label htmlFor="name" className="form__label">To-Do</label>
      </div>
      <button className="form__button" onClick={handleSubmit}>Add Task</button>
    </div>
  );
};

export default AddTask;