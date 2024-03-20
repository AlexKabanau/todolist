import { memo, useCallback } from 'react';
import { FilterValuesType } from './AppWithRedux';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Button, IconButton, Typography } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskAC } from './state/tasks-reducer';
import { AppRootStateType } from './state/store';
import { Task } from './Task';
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

export const TodoList = memo((props: PropsType) => {
  const dispatch = useDispatch();
  const tasksObj = useSelector<AppRootStateType, Array<TaskType>>((state) => state.tasks[props.id]);

  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };
  const changeTodoListTitle = useCallback(
    (newTitle: string) => {
      props.changeTodoListTitle(props.id, newTitle);
    },
    [props.id, props.changeTodoListTitle],
  );

  const onAllClickHandler = useCallback(() => {
    props.changeFilter('all', props.id);
  }, [props.changeFilter, props.id]);
  const onActiveClickHandler = useCallback(() => {
    props.changeFilter('active', props.id);
  }, [props.changeFilter, props.id]);
  const onComplitedClickHandler = useCallback(() => {
    props.changeFilter('complited', props.id);
  }, [props.changeFilter, props.id]);

  let tasksForTodoList = tasksObj;
  if (props.filter === 'complited') {
    tasksForTodoList = tasksObj.filter((t) => t.isDone === true);
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
        {tasksForTodoList.map((t) => (
          <Task key={t.id} task={t} todolistId={props.id} />
        ))}
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
});
