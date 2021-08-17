import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { TextArea } from '.';

export default {
  title: 'atoms/TextArea',
  component: TextArea,
} as Meta;

type Props = React.ComponentProps<typeof TextArea>;

const Template: Story<Props> = (args) => <TextArea {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  labelText: '詳細',
  placeholder: 'プレースホルダー',
  width: '343px',
  height: '200px',
};
