import { action } from '@storybook/addon-actions';
import React from 'react';

import { Button } from '.';

import type { Story, Meta } from '@storybook/react/types-6-0';

export default {
  argTypes: {
    styleTypes: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'textLink'],
    },
  },
  title: 'atoms/Button',
  component: Button,
} as Meta;

type Props = React.ComponentProps<typeof Button>;

const Template: Story<Props> = (args) => <Button {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  styleTypes: 'primary',
  buttonContent: 'Button',
  width: '200px',
  onClick: action('Button Clicked'),
};
