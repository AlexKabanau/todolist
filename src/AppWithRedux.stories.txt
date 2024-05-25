import { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import AppWithRedux from './AppWithRedux';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { ReduxStoreProviderDecorator } from './stories/ReduxStoreProviderDecorator';

const meta = {
  title: 'App with redux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator],
} satisfies Meta<typeof AppWithRedux>;

export default meta;

const callback = action('EditableSpan was changed');

export const AppWithReduxExample = (props: any) => {
  return <AppWithRedux />;
};
