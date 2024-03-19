import { Grid, IconButton, TextField } from '@mui/material';
import { ChangeEvent, KeyboardEvent, memo, useState } from 'react';
import AddTaskIcon from '@mui/icons-material/AddTask';
import React from 'react';

export type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm = memo(function AddItemForm(props: AddItemFormPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
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
  console.log('Form is called');

  return (
    <Grid display="flex" alignItems="center">
      <TextField
        variant={'filled'}
        color={'success'}
        label={'Type value'}
        value={newTaskTitle}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addTask} color={'success'}>
        <AddTaskIcon />
      </IconButton>
    </Grid>
  );
});
