import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { ProductCardSkeleton } from '.';

export default {
  title: 'organisms/ProductCardSkeleton',
  component: ProductCardSkeleton,
} as Meta;

type Props = React.ComponentProps<typeof ProductCardSkeleton>;

const Template: Story<Props> = () => <ProductCardSkeleton />;

export const Basic = Template.bind({});
