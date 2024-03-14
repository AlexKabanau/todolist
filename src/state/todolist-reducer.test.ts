import { FilterValuesType, TodoListType } from './../App';
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
  todolistReducer,
} from './todolist-reducer';
import { v1 } from 'uuid';

test('correct todolist should be removed', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();
  const startState: Array<TodoListType> = [
    { id: todoListId1, title: 'What to learn', filter: 'all' },
    { id: todoListId2, title: 'What to buy', filter: 'all' },
  ];

  // const endState = todolistReducer(startState, { type: 'REMOVE_TODOLIST', id: todoListId1 });
  const endState = todolistReducer(startState, removeTodoListAC(todoListId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});
test('correct todolist should be added', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();
  let newTodolistTitle = 'New Todo List Title';
  const startState: Array<TodoListType> = [
    { id: todoListId1, title: 'What to learn', filter: 'all' },
    { id: todoListId2, title: 'What to buy', filter: 'all' },
  ];

  // const endState = todolistReducer(startState, { type: 'ADD_TODOLIST', title: newTodolistTitle });
  const endState = todolistReducer(startState, addTodoListAC(newTodolistTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe('all');
});
test('correct todolist should change its name', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();
  let newTodolistTitle = 'New Todo List Title';
  const startState: Array<TodoListType> = [
    { id: todoListId1, title: 'What to learn', filter: 'all' },
    { id: todoListId2, title: 'What to buy', filter: 'all' },
  ];

  // const action = {
  //   type: 'CHANGE_TODOLIST_TITLE' as const,
  //   id: todoListId2,
  //   title: newTodolistTitle,
  // };

  const endState = todolistReducer(
    startState,
    changeTodoListTitleAC(todoListId2, newTodolistTitle),
  );

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();

  let newFilter: FilterValuesType = 'complited';

  const startState: Array<TodoListType> = [
    { id: todoListId1, title: 'What to learn', filter: 'all' },
    { id: todoListId2, title: 'What to buy', filter: 'all' },
  ];

  // const action: ChangeTodoListFilterActionType = {
  //   type: 'CHANGE_FILTER',
  //   id: todoListId2,
  //   filter: newFilter,
  // };

  const endState = todolistReducer(startState, changeTodoListFilterAC(todoListId2, newFilter));

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilter);
});
