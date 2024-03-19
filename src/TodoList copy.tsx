import { ChangeEvent } from 'react';
import { FilterValuesType } from './AppWithRedux';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Button, Checkbox, IconButton, Typography } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from './state/tasks-reducer';
import { AppRootStateType } from './state/store';
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  filter: FilterValuesType;
  removeTodoList: (todoListId: string) => void;
  changeTodoListTitle: (todoListId: string, newTitle: string) => void;
};

export const TodoList = (props: PropsType) => {
  const dispatch = useDispatch();
  const tasksObj = useSelector<AppRootStateType, Array<TaskType>>((state) => state.tasks[props.id]);

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };
  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(props.id, newTitle);
  };
  const onAllClickHandler = () => {
    props.changeFilter('all', props.id);
  };
  const onActiveClickHandler = () => {
    props.changeFilter('active', props.id);
  };
  const onComplitedClickHandler = () => {
    props.changeFilter('complited', props.id);
  };

  let tasksForTodoList = tasksObj;
  if (props.filter === 'complited') {
    tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === true);
  }
  if (props.filter === 'active') {
    tasksForTodoList = tasksForTodoList.filter((t) => t.isDone === false);
  }
  console.log('todolist is called');

  return (
    <div>
      <Typography
        variant={'h5'}
        component={'div'}
        sx={{ flexGrow: 1 }}
        display="flex"
        alignItems="center">
        <EditableSpan title={props.title} onChange={changeTodoListTitle} />{' '}
        <IconButton aria-label="delete" onClick={removeTodoList}>
          <DeleteTwoToneIcon />
        </IconButton>
      </Typography>
      <AddItemForm
        addItem={(title) => {
          dispatch(addTaskAC(title, props.id));
        }}
      />

      <div>
        {tasksForTodoList.map((t) => {
          const onRemoveHandler = () => {
            dispatch(removeTaskAC(props.id, t.id));
          };
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.id));
          };
          const onChangeTitleHandler = (newValue: string) => {
            dispatch(changeTaskTitleAC(t.id, newValue, props.id));
          };

          return (
            <div
              key={t.id}
              className={t.isDone ? 'is-done' : ''}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <Checkbox color={'success'} checked={t.isDone} onChange={onChangeStatusHandler} />
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
              <IconButton aria-label="delete" onClick={onRemoveHandler}>
                <DeleteTwoToneIcon />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div style={{ paddingTop: '10px' }}>
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
          color={'success'}
          variant={props.filter === 'complited' ? 'contained' : 'text'}
          onClick={onComplitedClickHandler}>
          Complited
        </Button>
      </div>
    </div>
  );
};
