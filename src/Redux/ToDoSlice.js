import { createSlice } from '@reduxjs/toolkit';
import Data from '../Data.json';

const initialState = {
  value: Data,
};

export const ToDoSlice = createSlice({
  name: "ToDoSlice",
  initialState,
  reducers: {
    // Adds a new task to the state
    addTask: (state, action) => {
      state.value = [...state.value, action.payload];
    },

    // Deletes a task from the state based on the task ID
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.value = state.value.filter(task => task.id !== taskId);
    },

    // Updates the title of a task based on its ID
    updateTask: (state, action) => {
      const id = action.payload.id;
      const updatedTaskTitle = action.payload.title;
      const index = state.value.findIndex(task => task.id === id);
      if (index !== -1) {
        state.value[index].title = updatedTaskTitle;
      }
    },

    // Toggles the 'isDone' property of a task
    toggleTask: (state, action) => {
      const taskId = action.payload;
      const task = state.value.find(task => task.id === taskId);
      if (task) {
        task.isDone = !task.isDone;
      }
    }
  }
});

export const { addTask, deleteTask, updateTask, toggleTask } = ToDoSlice.actions;

export default ToDoSlice.reducer;