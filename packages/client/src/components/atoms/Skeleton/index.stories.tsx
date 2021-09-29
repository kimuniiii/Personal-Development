import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Skeleton } from './index';

export default {
  component: Skeleton,
  title: 'atoms/Skeleton',
} as Meta;

type Props = React.ComponentProps<typeof Skeleton>;

const BasicTemplate: Story<Props> = (args) => {
  return <Skeleton {...args} />;
};

export const Basic = BasicTemplate.bind({});

Basic.args = {
  borderRadius: '3px',
  height: '100px',
  width: '500px',
};
