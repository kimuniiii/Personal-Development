import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { ProductCard } from '.';

export default {
  title: 'organisms/ProductCard',
  component: ProductCard,
} as Meta;

type ProductCardList = { id: number; name: string; price: number };

const productCardList: ProductCardList[] = [
  {
    id: 1,
    name: 'React First',
    price: 1000,
  },
  {
    id: 2,
    name: 'React Second',
    price: 2000,
  },
  {
    id: 3,
    name: 'React Third',
    price: 3000,
  },
  {
    id: 4,
    name: 'React Fourth',
    price: 4000,
  },
  {
    id: 5,
    name: 'React Fifth',
    price: 5000,
  },
  {
    id: 6,
    name: 'React Sixth',
    price: 6000,
  },
];

type Props = React.ComponentProps<typeof ProductCard>;

const Template: Story<Props> = (args) => <ProductCard {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  productCardList: productCardList,
};
