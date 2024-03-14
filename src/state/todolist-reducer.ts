import { v1 } from 'uuid';
import { FilterValuesType, TodoListType } from '../App';

export type RemoveTodoListActionType = {
  type: 'REMOVE_TODOLIST';
  id: string;
};
export type AddTodoListActionType = {
  type: 'ADD_TODOLIST';
  title: string;
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

export const todolistReducer = (
  state: Array<TodoListType>,
  action: ActionsTypes,
): Array<TodoListType> => {
  switch (action.type) {
    case 'REMOVE_TODOLIST': {
      return state.filter((item) => item.id !== action.id);
    }
    case 'ADD_TODOLIST': {
      return [
        ...state,
        {
          id: v1(),
          title: action.title,
          filter: 'all',
        },
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
      throw new Error(`Action is not supported`);
  }
};

export const RemoveTodoListAC = (todolistId: string): RemoveTodoListActionType => {
  return {
    type: 'REMOVE_TODOLIST',
    id: todolistId,
  };
};
export const AddTodoListAC = (title: string): AddTodoListActionType => {
  return {
    type: 'ADD_TODOLIST',
    title: title,
  };
};
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
  return {
    type: 'CHANGE_TODOLIST_TITLE',
    id: id,
    title: title,
  };
};
export const ChangeTodoListFilterAC = (
  id: string,
  filter: FilterValuesType,
): ChangeTodoListFilterActionType => {
  return {
    type: 'CHANGE_FILTER',
    id: id,
    filter: filter,
  };
};
