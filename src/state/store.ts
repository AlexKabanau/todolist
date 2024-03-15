import React from 'react';
import { combineReducers, createStore } from 'redux';
import { todolistReducer } from './todolist-reducer';
import { tasksReducer } from './tasks-reducer';
import { TasksStateType, TodoListType } from '../AppWithRedux';
import { configureStore, Tuple } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: tasksReducer,
});

// type AppRootState = {
//   todolists: Array<TodoListType>;
//   task: TasksStateType;
// };

export const store = createStore(rootReducer);

// export const store = configureStore({
//   reducer: {
//     todolists: todolistReducer,
//     tasks: tasksReducer,
//   },
// });
// type AppRootStateType = ReturnType<typeof store.getState()>
export type AppRootStateType = ReturnType<typeof rootReducer>;
//@ts-ignore
window.store = store;
