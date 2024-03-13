import React, { ChangeEvent } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Button, Checkbox, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  id: string;
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void;
  filter: FilterValuesType;
  removeTodoList: (todoListId: string) => void;
  changeTodoListTitle: (todoListId: string, newTitle: string) => void;
};

export const TodoList = (props: PropsType) => {
  const onAllClickHandler = () => {
    props.changeFilter('all', props.id);
  };
  const onActiveClickHandler = () => {
    props.changeFilter('active', props.id);
  };
  const onComplitedClickHandler = () => {
    props.changeFilter('complited', props.id);
  };
  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };
  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(props.id, newTitle);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodoListTitle} />{' '}
        <IconButton aria-label="delete" onClick={removeTodoList}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />

      <div>
        {props.tasks.map((t) => {
          const onRemoveHandler = () => {
            props.removeTask(t.id, props.id);
          };
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
          };
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
          };

          return (
            <div key={t.id} className={t.isDone ? 'is-done' : ''}>
              <Checkbox color={'secondary'} checked={t.isDone} onChange={onChangeStatusHandler} />
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
              <IconButton aria-label="delete" onClick={onRemoveHandler}>
                <Delete />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div>
        <Button
          color={'inherit'}
          variant={props.filter === 'all' ? 'contained' : 'text'}
          onClick={onAllClickHandler}>
          All
        </Button>
        <Button
          color={'primary'}
          variant={props.filter === 'active' ? 'contained' : 'text'}
          onClick={onActiveClickHandler}>
          Active
        </Button>
        <Button
          color={'secondary'}
          variant={props.filter === 'complited' ? 'contained' : 'text'}
          onClick={onComplitedClickHandler}>
          Complited
        </Button>
      </div>
    </div>
  );
};
