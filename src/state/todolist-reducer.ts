import { v1 } from 'uuid';
import { FilterValuesType, TodoListType } from '../AppWithRedux';

export type RemoveTodoListActionType = {
  type: 'REMOVE_TODOLIST';
  id: string;
};
export type AddTodoListActionType = {
  type: 'ADD_TODOLIST';
  title: string;
  todolistId: string;
};
export type ChangeTodoListTitleActionType = {
  type: 'CHANGE_TODOLIST_TITLE';
  id: string;
  title: string;
};
export type ChangeTodoListFilterActionType = {
  type: 'CHANGE_FILTER';
  id: string;
  filter: FilterValuesType;
};

export type ActionsTypes =
  | RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeTodoListTitleActionType
  | ChangeTodoListFilterActionType;

export let todoListId1 = v1();
export let todoListId2 = v1();

const initialState: Array<TodoListType> = [
  { id: todoListId1, title: 'What to learn', filter: 'all' },
  { id: todoListId2, title: 'What to buy', filter: 'all' },
];

export const todolistReducer = (
  state: Array<TodoListType> = initialState,
  action: ActionsTypes,
): Array<TodoListType> => {
  switch (action.type) {
    case 'REMOVE_TODOLIST': {
      return state.filter((item) => item.id !== action.id);
    }
    case 'ADD_TODOLIST': {
      return [
        {
          id: action.todolistId,
          title: action.title,
          filter: 'all',
        },
        ...state,
      ];
    }
    case 'CHANGE_TODOLIST_TITLE': {
      const todoList = state.find((todoList) => todoList.id === action.id);
      if (todoList) {
        todoList.title = action.title;
      }
      return [...state];
    }
    case 'CHANGE_FILTER': {
      let todoList = state.find((tl) => tl.id === action.id);
      if (todoList) {
        todoList.filter = action.filter;
      }
      return [...state];
    }
    default:
      return state;
  }
};

export const removeTodoListAC = (todolistId: string): RemoveTodoListActionType => {
  return {
    type: 'REMOVE_TODOLIST',
    id: todolistId,
  };
};
export const addTodoListAC = (title: string): AddTodoListActionType => {
  return {
    type: 'ADD_TODOLIST',
    title: title,
    todolistId: v1(),
  };
};
export const changeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
  return {
    type: 'CHANGE_TODOLIST_TITLE',
    id: id,
    title: title,
  };
};
export const changeTodoListFilterAC = (
  id: string,
  filter: FilterValuesType,
): ChangeTodoListFilterActionType => {
  return {
    type: 'CHANGE_FILTER',
    id: id,
    filter: filter,
  };
};
