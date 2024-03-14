import { TasksStateType, TodoListType } from '../App';
import { tasksReducer } from './tasks-reducer';
import { addTodoListAC, todolistReducer } from './todolist-reducer';

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistState: Array<TodoListType> = [];

  const action = addTodoListAC('newTodolist');

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistState = todolistReducer(startTodolistState, action);

  const keys = Object.keys(endTasksState);
  const idFromTask = keys[0];
  const idFromTodolist = endTodolistState[0].id;

  expect(idFromTask).toBe(action.todolistId);
  expect(idFromTodolist).toBe(action.todolistId);
});
