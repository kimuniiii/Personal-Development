import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Input } from '.';

export default {
  title: 'common/Input',
  component: Input,
} as Meta;

type Props = React.ComponentProps<typeof Input>;

const Template: Story<Props> = (args) => <Input {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  type: 'text',
  placeholder: 'プレースホルダー',
};
