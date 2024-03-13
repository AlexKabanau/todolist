import React, { useState } from 'react';
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
import { Menu } from '@mui/icons-material';

export type FilterValuesType = 'all' | 'complited' | 'active';
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId];

    let filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todoListId] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function addTask(title: string, todoListId: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    let tasks = tasksObj[todoListId];

    let newTasks = [newTask, ...tasks];
    tasksObj[todoListId] = newTasks;
    setTasks({ ...tasksObj });
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = todoLists.find((tl) => tl.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  }
  function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasksObj });
    }
  }

  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: 'What to learn', filter: 'all' },
    { id: todoListId2, title: 'What to buy', filter: 'all' },
  ]);

  function removeTodoList(todoListId: string) {
    let filteredTodoList = todoLists.filter((todoList) => todoList.id !== todoListId);
    setTodoLists(filteredTodoList);

    delete tasksObj[todoListId];
    setTasks({ ...tasksObj });
  }
  function changeTodoListTitle(todoListId: string, newTitle: string) {
    const todoList = todoLists.find((todoList) => todoList.id === todoListId);

    if (todoList) {
      todoList.title = newTitle;
      setTodoLists([...todoLists]);
    }
  }

  const [tasksObj, setTasks] = useState<TasksStateType>({
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

  function addTodoList(title: string) {
    let todoList: TodoListType = {
      id: v1(),
      title: title,
      filter: 'all',
    };
    setTodoLists([todoList, ...todoLists]);
    setTasks({ ...tasksObj, [todoList.id]: [] });
  }

  return (
    <div className="App">
      <AppBar position={'static'}>
        <Toolbar>
          <IconButton color={'inherit'} aria-label={'menu'} edge={'start'}>
            <Menu />
          </IconButton>
          <Typography variant={'h6'}>News</Typography>
          <Button color={'inherit'}>Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: '10px' }}>
          <div>
            <h1>TodoList</h1>
            <AddItemForm addItem={addTodoList} />
          </div>
        </Grid>

        <Grid container spacing={'10'}>
          {todoLists.map((todoList) => {
            let tasksForTodoList = tasksObj[todoList.id];
            if (todoList.filter === 'complited') {
              tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
            }
            if (todoList.filter === 'active') {
              tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
            }

            return (
              <Grid item>
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

export default App;
