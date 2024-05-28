import axios from 'axios';

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': 'f4bcbf25-138b-4ec8-9796-314594a7e9cc',
  },
};

export type TodolistType = {
  id: string;
  title: string;
  addDate: string;
  order: number;
};

type ResponseType<D> = {
  resultCode: number;
  messages: Array<string>;
  data: D;
};

export type TaskType = {
  description: string;
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

type GetTasksTypeResponse = {
  error: string | null;
  totalCount: number;
  items: Array<TaskType>;
};

export const todolistsApi = {
  getTodolists() {
    return axios.get<Array<TodolistType>>(
      `https://social-network.samuraijs.com/api/1.1/todo-lists`,
      settings,
    );
  },
  createTodolist(title: string) {
    return axios.post<
      ResponseType<{
        item: TodolistType;
      }>
    >(`https://social-network.samuraijs.com/api/1.1/todo-lists`, { title: title }, settings);
  },
  deleteTodolist(todolistId: string) {
    return axios.delete<ResponseType<{}>>(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,

      settings,
    );
  },
  updateTodolist(todolistId: string, title: string) {
    return axios.put<ResponseType<{}>>(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
      { title: title },
      settings,
    );
  },
  getTasks(todolistId: string) {
    return axios.get<GetTasksTypeResponse>(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
      settings,
    );
  },
};
