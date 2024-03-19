// import React, { useReducer } from 'react';
// import logo from './logo.svg';
import './App.css';
import { TaskType, TodoList } from './TodoList';
// import { v1 } from 'uuid';
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
  // todolistReducer,
} from './state/todolist-reducer';
// import {
//   addTaskAC,
//   changeTaskStatusAC,
//   changeTaskTitleAC,
//   removeTaskAC,
//   tasksReducer,
// } from './state/tasks-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';

export type FilterValuesType = 'all' | 'complited' | 'active';
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  const dispatch = useDispatch();

  const todoLists = useSelector<AppRootStateType, Array<TodoListType>>((state) => state.todolists);
  // const tasksObj = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks);

  function changeFilter(value: FilterValuesType, todoListId: string) {
    const action = changeTodoListFilterAC(todoListId, value);
    dispatch(action);
  }

  function removeTodoList(todoListId: string) {
    const action = removeTodoListAC(todoListId);
    dispatch(action);
  }

  function changeTodoListTitle(todoListId: string, newTitle: string) {
    const action = changeTodoListTitleAC(todoListId, newTitle);
    dispatch(action);
  }

  function addTodoList(title: string) {
    const action = addTodoListAC(title);
    dispatch(action);
  }
  console.log('App is called');

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
            return (
              <Grid item spacing={2}>
                <Paper style={{ padding: '10px' }}>
                  <TodoList
                    key={todoList.id}
                    id={todoList.id}
                    title={todoList.title}
                    changeFilter={changeFilter}
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

export default AppWithRedux;
