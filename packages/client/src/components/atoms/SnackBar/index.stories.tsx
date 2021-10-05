import { Story, Meta } from '@storybook/react/types-6-0';
import React, { useState } from 'react';

import { SnackBar } from '.';

export default {
  title: 'atoms/SnackBar',
  component: SnackBar,
} as Meta;

type Props = React.ComponentProps<typeof SnackBar>;

const Template: Story<Props> = (args) => {
  const [isShowSnackBar, setIsShowSnackBar] = useState(true);

  return (
    <SnackBar {...args} isShowSnackBar={isShowSnackBar} setIsShowSnackBar={setIsShowSnackBar} />
  );
};

export const Success = Template.bind({});

Success.args = {
  snackBarTypes: 'success',
  message: 'This is a success message（3秒後に消える）',
};

export const Fail = Template.bind({});

Fail.args = {
  snackBarTypes: 'fail',
  message: 'This is a failed message（3秒後に消える）',
};
