import React from 'react';
import { Provider } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { combineReducers, createStore } from 'redux';
import { todolistReducer } from '../state/todolist-reducer';
import { tasksReducer } from '../state/tasks-reducer';
import { v1 } from 'uuid';
import { configureStore } from '@reduxjs/toolkit';

const reducer = combineReducers({
  todolists: todolistReducer,
  tasks: tasksReducer,
});

const preloadedState = {
  todolists: [
    { id: 'todoListId1', title: 'What to learn', filter: 'all' },
    { id: 'todoListId2', title: 'What to buy', filter: 'all' },
  ],
  tasks: {
    todoListId1: [
      { id: v1(), title: 'CSS+HTML', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
      { id: v1(), title: 'Rest API', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
    todoListId2: [
      { id: v1(), title: 'Books', isDone: true },
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'Cucumber', isDone: false },
    ],
  },
};

export const store = createStore(combineReducers);

// export const stotyBookState = createStore(reducer, preloadedState as AppRootStateType);

//
// export const stotyBookState = configureStore({
//   reducer,
//   preloadedState,
// });

// type AppRootStateType = ReturnType<typeof stotyBookState.getState()>

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={store}>{storyFn()}</Provider>;
};
