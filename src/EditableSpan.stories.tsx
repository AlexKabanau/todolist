import { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { EditableSpan } from './EditableSpan';

const meta = {
  title: 'Editable Span',
  component: EditableSpan,
} satisfies Meta<typeof EditableSpan>;

export default meta;

const callback = action('EditableSpan was changed');

export const EditableSpanExample = (props: any) => {
  return <EditableSpan title={'title'} onChange={callback} />;
};
