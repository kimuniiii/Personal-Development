import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { SpProductCard } from '.';

export default {
  title: 'organisms/SpProductCard',
  component: SpProductCard,
} as Meta;

type ProductCardList = { id: number; name: string; price: number; base64_image: string };

const productCardList: ProductCardList[] = [
  {
    id: 1,
    name: 'React First',
    price: 1000,
    base64_image: '',
  },
  {
    id: 2,
    name: 'React Second',
    price: 2000,
    base64_image: '',
  },
  {
    id: 3,
    name: 'React Third',
    price: 3000,
    base64_image: '',
  },
  {
    id: 4,
    name: 'React Fourth',
    price: 4000,
    base64_image: '',
  },
  {
    id: 5,
    name: 'React Fifth',
    price: 5000,
    base64_image: '',
  },
  {
    id: 6,
    name: 'React Sixth',
    price: 6000,
    base64_image: '',
  },
];

type Props = React.ComponentProps<typeof SpProductCard>;

const Template: Story<Props> = (args) => <SpProductCard {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  productCardList: productCardList,
};
