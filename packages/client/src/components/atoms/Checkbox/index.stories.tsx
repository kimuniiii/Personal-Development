import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useState } from 'react';

import { Checkbox } from '.';

export default {
  component: Checkbox,
  title: 'atoms/Checkbox',
} as Meta;

type Props = React.ComponentProps<typeof Checkbox>;

const Template: Story<Props> = (args) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (): void => {
    setIsChecked((prev: boolean) => !prev);
  };

  return <Checkbox {...args} checked={isChecked} onChange={handleChange} />;
};

export const Basic = Template.bind({});

Basic.args = {
  disabled: false,
  labelText: '次回ログインを省略する',
};
