import { ChangeEvent, memo, useCallback } from 'react';
import { EditableSpan } from './EditableSpan';
import { Checkbox, IconButton } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useDispatch } from 'react-redux';
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { TaskType } from './TodoList';

export type TaskPropsType = {
  task: TaskType;
  todolistId: string;
};

export const Task = memo((props: TaskPropsType) => {
  const dispatch = useDispatch();

  const onRemoveHandler = useCallback(() => {
    dispatch(removeTaskAC(props.todolistId, props.task.id));
  }, []);

  const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    dispatch(changeTaskStatusAC(props.task.id, e.target.checked, props.todolistId));
  }, []);

  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId));
    },
    [props.task.id, props.todolistId],
  );

  return (
    <div
      className={props.task.isDone ? 'is-done' : ''}
      style={{
        display: 'flex',
        alignItems: 'center',
      }}>
      <Checkbox color={'success'} checked={props.task.isDone} onChange={onChangeStatusHandler} />
      <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
      <IconButton aria-label="delete" onClick={onRemoveHandler}>
        <DeleteTwoToneIcon />
      </IconButton>
    </div>
  );
});
