import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default {
  title: 'API',
};

const settings = axios.create({
  withCredentials: true,
  headers: {
    'API-KEY': 'f4bcbf25-138b-4ec8-9796-314594a7e9cc',
  },
});

export const GetTodoLists = () => {
  const [state, setState] = useState<any>([]);
  debugger;

  useEffect(() => {
    axios
      .get(`https://social-network.samuraijs.com/api/1.1/todo-lists`, {
        withCredentials: true,
        headers: {
          'API-KEY': 'f4bcbf25-138b-4ec8-9796-314594a7e9cc',
        },
      })
      .then((res) => {
        debugger;
        console.log('GET', res.data);

        setState(res.data);
      });
  }, []);

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
          'API-KEY': 'f4bcbf25-138b-4ec8-9796-314594a7e9cc',
        },
      },
    )
    .then((res) => {
      // debugger;
      setState(res.data);
    });

  return <div>SET (create), {JSON.stringify(state)}</div>;
};

export const DeleteTodoList = () => {
  const [state, setState] = useState<any>([]);
  debugger;

  useEffect(() => {
    axios
      .delete(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/8b45af5d-616b-4282-9d1e-36349397404f`,

        {
          withCredentials: true,
          headers: {
            'API-KEY': 'f4bcbf25-138b-4ec8-9796-314594a7e9cc',
          },
        },
      )
      .then((res) => {
        debugger;
        console.log('DELETE', res.data);

        setState(res.data);
      });
  }, []);

  return <div>DELETE, {JSON.stringify(state)}</div>;
};

export const UpdateTodoList = () => {
  const [state, setState] = useState<any>([]);

  axios
    .put(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/a0859e3c-4e54-4c0d-8ecf-833444eb196f`,
      { title: 'YoYo' },
      {
        withCredentials: true,
        headers: {
          'API-KEY': 'f4bcbf25-138b-4ec8-9796-314594a7e9cc',
        },
      },
    )
    .then((res) => {
      // debugger;
      setState(res.data);
    });

  return <div>SET newTitle, {JSON.stringify(state)}</div>;
};
