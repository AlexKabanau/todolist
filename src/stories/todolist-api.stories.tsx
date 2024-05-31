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
  //input
  const [state, setState] = useState<any>([]);
  const [title, setTitle] = useState<string>('title');

  // useEffect(() => {
  //   todolistsApi.createTodolist('title').then((res) => {
  //     // debugger;
  //     setState(res.data);
  //   });
  // }, []);

  const setTodoListTitle = () => {
    todolistsApi.createTodolist(title).then((res) => {
      // debugger;
      setState(res.data);
    });
  };

  return (
    <div>
      SET (create), {JSON.stringify(state)}
      <div>
        <input
          placeholder={`Title`}
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <button onClick={setTodoListTitle}>Create TodoList</button>
      </div>
    </div>
  );
};

export const DeleteTodoList = () => {
  const [state, setState] = useState<any>(null);
  const [taskId, setTaskId] = useState<string>(``);
  const [todoListId, setTodoListId] = useState<string>(``);

  // const todolistId = '2ba92eaa-543b-4f8a-adca-a77a015d3d86';
  debugger;

  // useEffect(() => {
  //   todolistsApi.deleteTodolist(todolistId).then((res) => {
  //     debugger;
  //     console.log('DELETE', res.data);

  //     setState(res.data);
  //   });
  // }, []);

  const deleteTodolist = () => {
    todolistsApi.deleteTodolist(todoListId).then((res) => {
      debugger;
      console.log('DELETE', res.data);

      setState(res.data);
    });
  };

  return (
    <div>
      DELETE, {JSON.stringify(state)}
      <div>
        <input
          placeholder={`todolistId`}
          value={todoListId}
          onChange={(e) => {
            setTodoListId(e.currentTarget.value);
          }}
        />
        {/* <input
          placeholder={`taskId`}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value);
          }}
        /> */}
        <button onClick={deleteTodolist}>Delete task</button>
      </div>
    </div>
  );
};

// export const UpdateTodoList = () => {
//   const [state, setState] = useState<any>([]);
//   const todolistId = '2ba92eaa-543b-4f8a-adca-a77a015d3d86';

//   useEffect(() => {
//     todolistsApi.updateTodolist(todolistId, 'String').then((res) => {
//       // debugger;
//       setState(res.data);
//     });
//   }, []);

//   return <div>SET newTitle, {JSON.stringify(state)}</div>;
// };

// export const GetTasks = () => {
//   const [state, setState] = useState<any>([]);
//   debugger;

//   useEffect(() => {
//     const todolistId = '0c46879c-7ac5-461c-acd5-8bf78208e118';
//     todolistsApi.getTasks(todolistId).then((res) => {
//       debugger;
//       console.log('GET tasks', res.data);

//       setState(res.data);
//     });
//   }, []);

//   return <div>GET tasks, {JSON.stringify(state)}</div>;
// };
// export const DeleteTasks = () => {
//   const [state, setState] = useState<any>([]);
//   debugger;

//   useEffect(() => {
//     const todolistId = '0c46879c-7ac5-461c-acd5-8bf78208e118';
//     const taskId = '';
//     todolistsApi.deleteTask(todolistId, taskId).then((res) => {
//       debugger;
//       console.log('DELETE tasks', res.data);

//       setState(res.data);
//     });
//   }, []);

//   return <div>GET tasks, {JSON.stringify(state)}</div>;
// };

// export const CreateTask = () => {};
// export const UpdateTask = () => {};
