import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddTask from '../components/AddTask';
import { addTask } from '../Redux/ToDoSlice';

const mockStore = configureStore([]);

describe('AddTask component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      value: [],
    });
  });

  test('renders Add Task component', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <AddTask />
      </Provider>
    );

    expect(getByPlaceholderText('Name')).toBeInTheDocument();
    expect(getByText('Add Task')).toBeInTheDocument();
  });

  test('adds a new task', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <AddTask />
      </Provider>
    );

    const input = getByPlaceholderText('Name');
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(getByText('Add Task'));

    expect(store.getActions()).toEqual([addTask({ id: expect.any(String), title: 'New Task', isDone: false })]);
  });

  test('does not add a task when input is empty', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AddTask />
      </Provider>
    );

    fireEvent.click(getByText('Add Task'));

    expect(store.getActions()).toEqual([]);
  });
});
w