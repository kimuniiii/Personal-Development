import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ProduceCard } from '.';

export default {
  title: 'organisms/ProductCard',
  component: ProduceCard,
} as Meta;

type Props = React.ComponentProps<typeof ProduceCard>;

const Template: Story<Props> = (args) => <ProduceCard {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  text: 'サンプル',
};
