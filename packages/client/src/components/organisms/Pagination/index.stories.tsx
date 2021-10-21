import React, { useState } from 'react';

import { Pagination } from './index';

import type { Meta, Story } from '@storybook/react/types-6-0';

export default {
  component: Pagination,
  title: 'organisms/Pagination',
} as Meta;

type Props = React.ComponentProps<typeof Pagination>;

const Template: Story<Props> = (args) => {
  const [defaultIndex, setDefaultIndex] = useState(1);

  return <Pagination {...args} defaultIndex={defaultIndex} onClick={setDefaultIndex} />;
};

export const Basic = Template.bind({});

Basic.args = {
  isPagerButton: true,
  lastIndex: 5,
};
