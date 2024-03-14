import { TextField } from '@mui/material';
import React, { ChangeEvent, useState, KeyboardEvent } from 'react';

export type EditableSpanPropsType = {
  title: string;
  onChange: (value: string) => void;
};

export function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');

  function activateEditMode() {
    setEditMode(true);
    setTitle(props.title);
  }
  function activateViewMode() {
    setEditMode(false);
    props.onChange(title);
  }
  function onChangeTitleHandler(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.currentTarget.value);
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      activateViewMode();
    }
  };

  return editMode ? (
    <TextField
      variant={'filled'}
      color={'success'}
      label={'Change value'}
      autoFocus
      type="text"
      value={title}
      onBlur={activateViewMode}
      onChange={onChangeTitleHandler}
      onKeyDown={onKeyDownHandler}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
}
