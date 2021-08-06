import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { OuterLink } from './index';

export default {
  component: OuterLink,
  title: 'common/OuterLink',
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
