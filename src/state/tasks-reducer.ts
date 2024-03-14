import { v1 } from 'uuid';
import { FilterValuesType, TasksStateType, TodoListType } from '../App';
import { AddTodoListActionType, RemoveTodoListActionType } from './todolist-reducer';

export type RemoveTaskActionType = {
  type: 'REMOVE_TASK';
  todolistId: string;
  taskId: string;
};
export type AddTaskActionType = {
  type: 'ADD_TASK';
  title: string;
  todolistId: string;
};
export type ChangeTaskStatusActionType = {
  type: 'CHANGE_TASK_STATUS';
  taskId: string;
  isDone: boolean;
  todolistId: string;
};
export type ChangeTaskTitleActionType = {
  type: 'CHANGE_TASK_TITLE';
  taskId: string;
  title: string;
  todolistId: string;
};

export type ActionsTypes =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodoListActionType
  | RemoveTodoListActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsTypes): TasksStateType => {
  switch (action.type) {
    case 'REMOVE_TASK': {
      const stateCopy = { ...state };
      const tasks = state[action.todolistId];
      const filteredTasks = tasks.filter((t) => t.id !== action.taskId);
      stateCopy[action.todolistId] = filteredTasks;
      return { ...stateCopy };
    }
    case 'ADD_TASK': {
      const stateCopy = { ...state };
      let tasks = state[action.todolistId];
      const newTasks = [
        {
          id: v1(),
          title: action.title,
          isDone: false,
        },
        ...tasks,
      ];

      stateCopy[action.todolistId] = newTasks;
      return { ...stateCopy };
    }
    case 'CHANGE_TASK_STATUS': {
      const stateCopy = { ...state };
      let tasks = state[action.todolistId];
      let task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.isDone = action.isDone;
      }

      return { ...stateCopy };
    }
    case 'ADD_TODOLIST': {
      const stateCopy = { ...state };

      stateCopy[action.todolistId] = [];

      return { ...stateCopy };
    }
    case 'CHANGE_TASK_TITLE': {
      const stateCopy = { ...state };
      let tasks = state[action.todolistId];
      let task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.title = action.title;
      }

      return { ...stateCopy };
    }
    case 'REMOVE_TODOLIST': {
      const stateCopy = { ...state };
      delete stateCopy[action.id];

      return { ...stateCopy };
    }
    default:
      throw new Error(`Action is not supported`);
  }
};

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
  return {
    type: 'REMOVE_TASK',
    todolistId: todolistId,
    taskId: taskId,
  };
};
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return {
    type: 'ADD_TASK',
    title: title,
    todolistId: todolistId,
  };
};
export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistId: string,
): ChangeTaskStatusActionType => {
  return {
    type: 'CHANGE_TASK_STATUS',
    taskId: taskId,
    isDone: isDone,
    todolistId: todolistId,
  };
};
export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string,
): ChangeTaskTitleActionType => {
  return {
    type: 'CHANGE_TASK_TITLE',
    taskId: taskId,
    title: title,
    todolistId: todolistId,
  };
};