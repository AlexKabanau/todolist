import axios from 'axios';

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': 'f4bcbf25-138b-4ec8-9796-314594a7e9cc',
  },
};

export const todolistsApi = {
  getTodolists() {
    return axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists`, settings);
  },
  createTodolist(title: string) {
    return axios.post(
      `https://social-network.samuraijs.com/api/1.1/todo-lists`,
      { title: title },
      settings,
    );
  },
  deleteTodolist() {
    const todolistId = `a0859e3c-4e54-4c0d-8ecf-833444eb196f`;

    return axios.delete(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,

      settings,
    );
  },
  updateTodolist(title: string) {
    const todolistId = `2ba92eaa-543b-4f8a-adca-a77a015d3d86`;

    return axios.put(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
      { title: title },
      settings,
    );
  },
};
