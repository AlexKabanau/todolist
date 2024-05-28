import React, { useEffect, useState } from 'react';
import { todolistsApi } from '../API/todolists-api';

export default {
  title: 'API',
};

export const GetTodoLists = () => {
  const [state, setState] = useState<any>([]);
  debugger;

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      debugger;
      console.log('GET', res.data);

      setState(res.data);
    });
  }, []);

  return <div>GET, {JSON.stringify(state)}</div>;
};

export const CreateTodoList = () => {
  const [state, setState] = useState<any>([]);

  useEffect(() => {
    todolistsApi.createTodolist('title').then((res) => {
      // debugger;
      setState(res.data);
    });
  }, []);

  return <div>SET (create), {JSON.stringify(state)}</div>;
};

export const DeleteTodoList = () => {
  const [state, setState] = useState<any>([]);
  const todolistId = '2ba92eaa-543b-4f8a-adca-a77a015d3d86';
  debugger;

  useEffect(() => {
    todolistsApi.deleteTodolist(todolistId).then((res) => {
      debugger;
      console.log('DELETE', res.data);

      setState(res.data);
    });
  }, []);

  return <div>DELETE, {JSON.stringify(state)}</div>;
};

export const UpdateTodoList = () => {
  const [state, setState] = useState<any>([]);
  const todolistId = '2ba92eaa-543b-4f8a-adca-a77a015d3d86';

  useEffect(() => {
    todolistsApi.updateTodolist(todolistId, 'String').then((res) => {
      // debugger;
      setState(res.data);
    });
  }, []);

  return <div>SET newTitle, {JSON.stringify(state)}</div>;
};
