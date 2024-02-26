import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { TaskType, TodoList } from './TodoList';

export type FilterValuesType = 'all' | 'complited' | 'active';

function App() {
  // let initTasks: Array<TaskType> = [
  //   { id: 1, title: 'CSS+HTML', isDone: true },
  //   { id: 2, title: 'JS', isDone: true },
  //   { id: 3, title: 'React', isDone: false },
  //   { id: 4, title: 'Angular', isDone: false },
  // ];

  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: 'CSS+HTML', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'React', isDone: false },
    { id: 4, title: 'Angular', isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterValuesType>('all');

  function removeTask(id: number) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let tasksForTodoList = tasks;
  if (filter === 'complited') {
    tasksForTodoList = tasks.filter((t) => t.isDone === true);
  }
  if (filter === 'active') {
    tasksForTodoList = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="App">
      <h1>TodoList</h1>
      <TodoList
        title="What to learn"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
