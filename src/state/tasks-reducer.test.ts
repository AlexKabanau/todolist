import { TasksStateType } from '../AppWithRedux';
import {
  removeTaskAC,
  addTaskAC,
  changeTaskStatusAC,
  tasksReducer,
  changeTaskTitleAC,
} from './tasks-reducer';
import { v1 } from 'uuid';
import { addTodoListAC, removeTodoListAC } from './todolist-reducer';

test('correct task should be deleted from correct array', () => {
  const todoListId1 = 'todoListId1';
  const todoListId2 = 'todoListId2';
  const startState: TasksStateType = {
    [todoListId1]: [
      { id: '1', title: 'CSS+HTML', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'ReactJS', isDone: false },
      { id: '4', title: 'Rest API', isDone: false },
      { id: '5', title: 'GraphQL', isDone: false },
    ],
    [todoListId2]: [
      { id: '1', title: 'Books', isDone: true },
      { id: '2', title: 'Milk', isDone: true },
      { id: '3', title: 'Cucumber', isDone: false },
    ],
  };

  const action = removeTaskAC('todoListId2', '2');

  // const endState = todolistReducer(startState, { type: 'REMOVE_TODOLIST', id: todoListId1 });
  const endState = tasksReducer(startState, action);

  expect(endState['todoListId1'].length).toBe(5);
  expect(endState['todoListId2'].length).toBe(2);
  expect(endState['todoListId2'].every((t) => t.id != '2')).toBeTruthy();
});
test('correct task should be added to correct array', () => {
  const todoListId1 = 'todoListId1';
  const todoListId2 = 'todoListId2';
  const startState: TasksStateType = {
    [todoListId1]: [
      { id: '1', title: 'CSS+HTML', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'ReactJS', isDone: false },
      { id: '4', title: 'Rest API', isDone: false },
      { id: '5', title: 'GraphQL', isDone: false },
    ],
    [todoListId2]: [
      { id: '1', title: 'Books', isDone: true },
      { id: '2', title: 'Milk', isDone: true },
      { id: '3', title: 'Cucumber', isDone: false },
    ],
  };

  const action = addTaskAC('juce', 'todoListId2');

  const endState = tasksReducer(startState, action);

  expect(endState['todoListId1'].length).toBe(5);
  expect(endState['todoListId2'].length).toBe(4);
  expect(endState['todoListId2'][0].id).toBeDefined();
  expect(endState['todoListId2'][0].title).toBe('juce');
  expect(endState['todoListId2'][0].isDone).toBe(false);
});
test('status of specified task should be changed', () => {
  const todoListId1 = 'todoListId1';
  const todoListId2 = 'todoListId2';
  const startState: TasksStateType = {
    [todoListId1]: [
      { id: '1', title: 'CSS+HTML', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'ReactJS', isDone: false },
      { id: '4', title: 'Rest API', isDone: false },
      { id: '5', title: 'GraphQL', isDone: false },
    ],
    [todoListId2]: [
      { id: '1', title: 'Books', isDone: true },
      { id: '2', title: 'Milk', isDone: true },
      { id: '3', title: 'Cucumber', isDone: false },
    ],
  };

  const action = changeTaskStatusAC('2', false, 'todoListId2');

  const endState = tasksReducer(startState, action);

  expect(endState['todoListId2'][1].isDone).toBeFalsy();
  expect(endState['todoListId1'][1].isDone).toBeTruthy();
});
test('title of specified task should be changed', () => {
  const todoListId1 = 'todoListId1';
  const todoListId2 = 'todoListId2';
  const startState: TasksStateType = {
    [todoListId1]: [
      { id: '1', title: 'CSS+HTML', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'ReactJS', isDone: false },
      { id: '4', title: 'Rest API', isDone: false },
      { id: '5', title: 'GraphQL', isDone: false },
    ],
    [todoListId2]: [
      { id: '1', title: 'Books', isDone: true },
      { id: '2', title: 'Milk', isDone: true },
      { id: '3', title: 'Cucumber', isDone: false },
    ],
  };

  const action = changeTaskTitleAC('2', 'false', 'todoListId2');

  const endState = tasksReducer(startState, action);

  expect(endState['todoListId2'][1].title).toBe('false');
  expect(endState['todoListId1'][1].title).toBe('JS');
});
test('new property with new new array should be added when new todolist is added', () => {
  const todoListId1 = 'todoListId1';
  const todoListId2 = 'todoListId2';
  const startState: TasksStateType = {
    [todoListId1]: [
      { id: '1', title: 'CSS+HTML', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'ReactJS', isDone: false },
      { id: '4', title: 'Rest API', isDone: false },
      { id: '5', title: 'GraphQL', isDone: false },
    ],
    [todoListId2]: [
      { id: '1', title: 'Books', isDone: true },
      { id: '2', title: 'Milk', isDone: true },
      { id: '3', title: 'Cucumber', isDone: false },
    ],
  };

  const action = addTodoListAC('new todolist');

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((key) => key != 'todoListId1' && key != 'todoListId2');
  if (!newKey) {
    throw new Error('new key should be added');
  }
  expect(keys.length).toBe(3);

  expect(endState[newKey]).toEqual([]);
});
test('property with todolist should be deleted', () => {
  const todoListId1 = 'todoListId1';
  const todoListId2 = 'todoListId2';
  const startState: TasksStateType = {
    [todoListId1]: [
      { id: '1', title: 'CSS+HTML', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'ReactJS', isDone: false },
      { id: '4', title: 'Rest API', isDone: false },
      { id: '5', title: 'GraphQL', isDone: false },
    ],
    [todoListId2]: [
      { id: '1', title: 'Books', isDone: true },
      { id: '2', title: 'Milk', isDone: true },
      { id: '3', title: 'Cucumber', isDone: false },
    ],
  };

  const action = removeTodoListAC('todoListId2');

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  expect(keys.length).toBe(1);

  expect(endState[todoListId2]).not.toBeDefined();
});
