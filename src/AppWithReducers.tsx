import React, { useReducer, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { TaskType, TodoList } from './TodoList';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Menu } from '@mui/icons-material';
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todolistReducer,
} from './state/todolist-reducer';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from './state/tasks-reducer';

export type FilterValuesType = 'all' | 'complited' | 'active';
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithReducers() {
  function removeTask(id: string, todoListId: string) {
    const action = removeTaskAC(todoListId, id);
    dispatchToTaskReducer(action);
  }

  function addTask(title: string, todoListId: string) {
    const action = addTaskAC(title, todoListId);
    dispatchToTaskReducer(action);
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    const action = changeTaskStatusAC(taskId, isDone, todoListId);
    dispatchToTaskReducer(action);
  }

  function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
    const action = changeTaskTitleAC(taskId, newTitle, todoListId);
    dispatchToTaskReducer(action);
  }

  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, dispatchToTodoListReducer] = useReducer(todolistReducer, [
    { id: todoListId1, title: 'What to learn', filter: 'all' },
    { id: todoListId2, title: 'What to buy', filter: 'all' },
  ]);
  const [tasksObj, dispatchToTaskReducer] = useReducer(tasksReducer, {
    [todoListId1]: [
      { id: v1(), title: 'CSS+HTML', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
      { id: v1(), title: 'Rest API', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: 'Books', isDone: true },
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'Cucumber', isDone: false },
    ],
  });

  function changeFilter(value: FilterValuesType, todoListId: string) {
    const action = changeTodoListFilterAC(todoListId, value);
    dispatchToTodoListReducer(action);
  }

  function removeTodoList(todoListId: string) {
    const action = removeTodoListAC(todoListId);
    dispatchToTodoListReducer(action);
    dispatchToTaskReducer(action);
  }

  function changeTodoListTitle(todoListId: string, newTitle: string) {
    const action = changeTodoListTitleAC(todoListId, newTitle);
    dispatchToTodoListReducer(action);
  }

  function addTodoList(title: string) {
    const action = addTodoListAC(title);
    dispatchToTodoListReducer(action);
    dispatchToTaskReducer(action);
  }

  return (
    <div className="App">
      <AppBar position={'static'} color={'success'}>
        <Toolbar>
          <IconButton
            size={'large'}
            edge={'start'}
            color={'inherit'}
            aria-label={'menu'}
            sx={{ mr: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant={'h6'} component={'div'} sx={{ flexGrow: 1 }}>
            TODOLIST
          </Typography>
          <Button color={'inherit'}>Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ paddingBottom: '10px', paddingTop: '10px' }}>
          <div>
            <AddItemForm addItem={addTodoList} />
          </div>
        </Grid>

        <Grid container spacing={2}>
          {todoLists.map((todoList) => {
            let tasksForTodoList = tasksObj[todoList.id];
            if (todoList.filter === 'complited') {
              tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
            }
            if (todoList.filter === 'active') {
              tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
            }

            return (
              <Grid item spacing={2}>
                <Paper style={{ padding: '10px' }}>
                  <TodoList
                    key={todoList.id}
                    id={todoList.id}
                    title={todoList.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={todoList.filter}
                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducers;
