import { Meta } from '@storybook/react';
import { AddItemForm } from './AddItemForm';
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'AddItemForm Component',
  component: AddItemForm,
} satisfies Meta<typeof AddItemForm>;

export default meta;

const callback = action('Button add was pressed inside the form');

export const AddItemFormBaseExample = (props: any) => {
  return <AddItemForm addItem={callback} />;
};
