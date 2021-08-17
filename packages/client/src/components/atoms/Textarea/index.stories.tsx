import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Textarea } from '.';

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
