import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { TaskType, TodoList } from './TodoList';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'complited' | 'active';
type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
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

  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: 'What to learn', filter: 'active' },
    { id: todoListId2, title: 'What to buy', filter: 'complited' },
  ]);

  let removeTodoList = (todoListId: string) => {
    let filteredTodoList = todoLists.filter((todoList) => todoList.id !== todoListId);
    setTodoLists(filteredTodoList);
    delete tasksObj[todoListId];
  };

  const [tasksObj, setTasks] = useState({
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

  return (
    <div className="App">
      <h1>TodoList</h1>
      {todoLists.map((todoList) => {
        let tasksForTodoList = tasksObj[todoList.id];
        if (todoList.filter === 'complited') {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
        }
        if (todoList.filter === 'active') {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
        }

        return (
          <TodoList
            key={todoList.id}
            id={todoList.id}
            title={todoList.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={todoList.filter}
            removeTodoList={removeTodoList}
          />
        );
      })}
    </div>
  );
}

export default App;
