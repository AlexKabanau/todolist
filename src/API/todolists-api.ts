import axios from 'axios';

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': 'e83e6c49-ac69-4ad6-9a30-6f605cba2ca7',
  },
};

const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.1/`,
  ...settings,
});

export type TodolistType = {
  id: string;
  title: string;
  addDate: string;
  order: number;
};

type ResponseType<D = {}> = {
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

export type UpdateTaskType = {
  title: string;
  completed: boolean;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

type GetTasksTypeResponse = {
  error: string | null;
  totalCount: number;
  items: Array<TaskType>;
};

export const todolistsApi = {
  getTodolists() {
    return instance.get<Array<TodolistType>>(`todo-lists`);
  },
  createTodolist(title: string) {
    return instance.post<
      ResponseType<{
        item: TodolistType;
      }>
    >(`todo-lists`, { title: title });
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },
  // updateTodolist(todolistId: string, title: string) {
  //   return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title: title });
  // },
  // getTasks(todolistId: string) {
  //   return instance.get<GetTasksTypeResponse>(`todo-lists/${todolistId}/tasks`);
  // },
  // deleteTask(todolistId: string, taskId: string) {
  //   return instance.delete<ResponseType>(`todo-lists/${todolistId}/${taskId}`);
  // },
  // createTask(todolistId: string, taskId: string) {
  //   return instance.delete<ResponseType>(`todo-lists/${todolistId}/${taskId}`);
  // },
  // updateTask(todolistId: string, taskId: string) {
  //   return instance.delete<ResponseType>(`todo-lists/${todolistId}/${taskId}`);
  // },
};
