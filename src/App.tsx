import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { TaskType, TodoList } from './TodoList';

function App() {
  let tasks1: Array<TaskType> = [
    { id: 1, title: 'CSS+HTML', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'React', isDone: false },
  ];

  let tasks2: Array<TaskType> = [
    { id: 1, title: 'Terminator', isDone: true },
    { id: 2, title: 'XXX', isDone: false },
    { id: 3, title: 'Gentelments of Fortune', isDone: true },
  ];

  return (
    <div className="App">
      <h1>TodoList</h1>
      {/* <input type="checkbox" />
      <input type="date" />
      <input placeholder="todoList" /> */}
      <TodoList title="What to learn" tasks={tasks1} />
      <TodoList title="Movies" tasks={tasks2} />
    </div>
  );
}

export default App;
