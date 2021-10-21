import React from 'react';

import { OuterLink } from './index';

import type { Meta, Story } from '@storybook/react/types-6-0';

export default {
  component: OuterLink,
  title: 'atoms/OuterLink',
} as Meta;

type Props = React.ComponentProps<typeof OuterLink>;

const Template: Story<Props> = (args) => {
  return <OuterLink {...args} />;
};

export const Basic = Template.bind({});

Basic.args = {
  children: 'ログイン',
  fontSizeValue: '14px',
};
