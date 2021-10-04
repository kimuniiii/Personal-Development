import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { SnackBar } from '.';

export default {
  title: 'atoms/SnackBar',
  component: SnackBar,
} as Meta;

type Props = React.ComponentProps<typeof SnackBar>;

const Template: Story<Props> = (args) => <SnackBar {...args} />;

export const Success = Template.bind({});

Success.args = {
  snackBarTypes: 'success',
  message: 'This is success message',
};

export const Fail = Template.bind({});

Fail.args = {
  snackBarTypes: 'fail',
  message: 'This is failed message',
};
