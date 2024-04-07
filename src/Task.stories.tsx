import { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Task } from './Task';

const meta = {
  title: 'Task Component',
  component: Task,
} satisfies Meta<typeof Task>;

export default meta;

const callback = action('Button add was pressed inside the form');

export const TaskBaseExample = (props: any) => {
  return (
    <>
      <Task
        task={{
          id: '1',
          title: 'Task 1',
          isDone: true,
        }}
        todolistId={'todolistId1'}
      />
      <Task
        task={{
          id: '1',
          title: 'Task 2',
          isDone: false,
        }}
        todolistId={'todolistId2'}
      />
      ;
    </>
  );
};
