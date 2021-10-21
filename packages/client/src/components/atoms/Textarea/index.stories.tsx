import React from 'react';

import { Textarea } from '.';

import type { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: 'atoms/Textarea',
  component: Textarea,
} as Meta;

type Props = React.ComponentProps<typeof Textarea>;

const Template: Story<Props> = (args) => <Textarea {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  labelText: '詳細',
  placeholder: 'プレースホルダー',
  width: '343px',
  height: '200px',
};
