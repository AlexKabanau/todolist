import { ControlPoint } from '@mui/icons-material';
import { Button, IconButton, TextField } from '@mui/material';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import AddTaskIcon from '@mui/icons-material/AddTask';

export type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      addTask();
      // props.addTask(newTaskTitle, props.id);
      // setNewTaskTitle('');
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle('');
    } else {
      setError('Title is required');
    }
  };

  return (
    <div>
      <TextField
        variant={'outlined'}
        label={'Type value'}
        value={newTaskTitle}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addTask} color={'secondary'}>
        <AddTaskIcon />
      </IconButton>
    </div>
  );
}
