import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ProductCard } from '.';

import ReactImage from '../../../../public/react.jpg';

export default {
  title: 'organisms/ProductCard',
  component: ProductCard,
} as Meta;

type ProductCardList = {
  productImage: {
    src: string;
    width: number;
    height: number;
  };
  productImageAlt: string;
  productName: string;
  productMoney: string;
};

const productCardList: ProductCardList[] = [
  {
    productImage: ReactImage,
    productImageAlt: 'Reactの画像です',
    productName: 'React First',
    productMoney: '¥1000',
  },
  {
    productImage: ReactImage,
    productImageAlt: 'Reactの画像です',
    productName: 'React Second',
    productMoney: '¥1000',
  },
  {
    productImage: ReactImage,
    productImageAlt: 'Reactの画像です',
    productName: 'React Third',
    productMoney: '¥1000',
  },
  {
    productImage: ReactImage,
    productImageAlt: 'Reactの画像です',
    productName: 'React Fourth',
    productMoney: '¥1000',
  },
  {
    productImage: ReactImage,
    productImageAlt: 'Reactの画像です',
    productName: 'React Fifth',
    productMoney: '¥1000',
  },
  {
    productImage: ReactImage,
    productImageAlt: 'Reactの画像です',
    productName: 'React Sixth',
    productMoney: '¥1000',
  },
];

type Props = React.ComponentProps<typeof ProductCard>;

const Template: Story<Props> = (args) => <ProductCard {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  productCardList: productCardList,
};
