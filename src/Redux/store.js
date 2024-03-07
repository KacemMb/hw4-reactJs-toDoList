import { configureStore } from '@reduxjs/toolkit'
import ToDoSlice from './ToDoSlice'
export const store = configureStore({
  reducer: {
    ToDoSlice : ToDoSlice,
  },
})