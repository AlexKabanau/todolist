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
        <button onClick={deleteTodolist}>Delete todoList</button>
      </div>
    </div>
  );
};

export const UpdateTodoList = () => {
  const [state, setState] = useState<any>([]);
  const [todoListId, setTodoListId] = useState<string>(``);
  const [title, setTitle] = useState<string>(`New Title`);

  const updateTodoList = () => {
    todolistsApi.updateTodolist(todoListId, title).then((res) => {
      // debugger;
      setState(res.data);
    });
  };

  return (
    <div>
      SET newTitle, {JSON.stringify(state)}
      <div>
        <input
          placeholder={`todolistId`}
          value={todoListId}
          onChange={(e) => {
            setTodoListId(e.currentTarget.value);
          }}
        />
        <input
          placeholder={`title`}
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <button onClick={updateTodoList}>Update TodoList</button>
      </div>
    </div>
  );
};

export const GetTasks = () => {
  const [state, setState] = useState<any>([]);
  const [todoListId, setTodoListId] = useState<string>(``);

  debugger;

  // useEffect(() => {
  //   todolistsApi.getTasks(todoListId).then((res) => {
  //     debugger;
  //     console.log('GET tasks', res.data);

  //     setState(res.data);
  //   });
  // }, []);

  const getTasks = () => {
    todolistsApi.getTasks(todoListId).then((res) => {
      debugger;
      console.log('GET tasks', res.data);

      setState(res.data);
    });
  };

  return (
    <div>
      GET tasks, {JSON.stringify(state)}
      <div>
        <input
          placeholder={`todolistId`}
          value={todoListId}
          onChange={(e) => {
            setTodoListId(e.currentTarget.value);
          }}
        />
        <button onClick={getTasks}>Get task</button>
      </div>
    </div>
  );
};
export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null);
  const [taskId, setTaskId] = useState<string>(``);
  const [todoListId, setTodoListId] = useState<string>(``);
  debugger;

  // useEffect(() => {
  //   // const todolistId = '0c46879c-7ac5-461c-acd5-8bf78208e118';
  //   // const taskId = '';
  //   todolistsApi.deleteTask(todoListId, taskId).then((res) => {
  //     debugger;
  //     console.log('DELETE tasks', res.data);

  //     setState(res.data);
  //   });
  // }, []);

  const deleteTask = () => {
    // console.log(todoListId, taskId);

    todolistsApi.deleteTask(todoListId, taskId).then((res) => {
      debugger;
      console.log('DELETE task', res.data);

      setState(res.data);
    });
  };

  return (
    <div>
      DELETE task, {JSON.stringify(state)}
      <div>
        <input
          placeholder={`todolistId`}
          value={todoListId}
          onChange={(e) => {
            setTodoListId(e.currentTarget.value);
          }}
        />
        <input
          placeholder={`taskId`}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value);
          }}
        />
        <button onClick={deleteTask}>Delete task</button>
      </div>
    </div>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskTitle, setTaskTitle] = useState<string>(``);
  const [todoListId, setTodoListId] = useState<string>(``);

  const createTask = () => {
    todolistsApi.createTask(todoListId, taskTitle).then((res) => {
      debugger;
      console.log('CREATE task', res.data);

      setState(res.data);
    });
  };

  return (
    <div>
      CREATE task, {JSON.stringify(state)}
      <div>
        <input
          placeholder={`todolistId`}
          value={todoListId}
          onChange={(e) => {
            setTodoListId(e.currentTarget.value);
          }}
        />
        <input
          placeholder={`TaskTitle`}
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.currentTarget.value);
          }}
        />
        <button onClick={createTask}>Create task</button>
      </div>
    </div>
  );
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskTitle, setTaskTitle] = useState<string>(``);
  const [todoListId, setTodoListId] = useState<string>(``);
  const [taskId, setTaskId] = useState<string>(``);

  const updateTask = () => {
    todolistsApi.updateTask(todoListId, taskId, taskTitle).then((res) => {
      debugger;
      console.log('UPDATE task', res.data);

      setState(res.data);
    });
  };

  return (
    <div>
      CREATE task, {JSON.stringify(state)}
      <div>
        <input
          placeholder={`TodoList Id`}
          value={todoListId}
          onChange={(e) => {
            setTodoListId(e.currentTarget.value);
          }}
        />
        <input
          placeholder={`Task Id`}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value);
          }}
        />
        <input
          placeholder={`New Task Title`}
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.currentTarget.value);
          }}
        />
        <button onClick={updateTask}>Update task</button>
      </div>
    </div>
  );
};

// {"id":"958951be-f4dc-4661-a295-4595b9cd2fe6","title":"Task Title TEST","description":null,"todoListId":"122d78bb-71e9-4a0c-a03e-bbf0578e2575","order":0,"status":0,"priority":1,"startDate":null,"deadline":null,"addedDate":"2024-06-06T05:46:59.41"}
