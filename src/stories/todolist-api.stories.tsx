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
  const [state, setState] = useState<any>(null);
  debugger;

  instance.get(`todo-lists`).then((res) => {
    debugger;
    console.log(res);
  });

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodoList = () => {};

export const DeleteTodoList = () => {};

export const UpdateTodoList = () => {};
