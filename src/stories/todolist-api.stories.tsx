import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default {
  title: 'API',
};

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    'API-KEY': 'a6235f60-17e5-4077-a023-12c9679f93bf',
  },
});

export const GetTodoLists = () => {
  const [state, setState] = useState<any>([]);
  debugger;

  axios
    .get(`https://social-network.samuraijs.com/api/1.1/todo-lists`, {
      withCredentials: true,
      headers: {
        'API-KEY': 'a6235f60-17e5-4077-a023-12c9679f93bf',
      },
    })
    .then((res) => {
      // debugger;
      console.log('GET', res.data);

      setState(res.data);
    });

  return <div>GET, {JSON.stringify(state)}</div>;
};

export const CreateTodoList = () => {
  const [state, setState] = useState<any>([]);

  axios
    .post(
      `https://social-network.samuraijs.com/api/1.1/todo-lists`,
      { title: 'string todoList' },
      {
        withCredentials: true,
        headers: {
          'API-KEY': 'a6235f60-17e5-4077-a023-12c9679f93bf',
        },
      },
    )
    .then((res) => {
      // debugger;
      setState(res.data);
    });
};

export const DeleteTodoList = () => {};

export const UpdateTodoList = () => {};
