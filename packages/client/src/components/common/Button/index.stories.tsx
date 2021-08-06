import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Button } from '.';

export default {
  title: 'common/Button',
  component: Button,
} as Meta;

type Props = React.ComponentProps<typeof Button>;

const Template: Story<Props> = (args) => <Button {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  styleTypes: 'primary',
  buttonContent: 'Button',
  width: '200px',
};
