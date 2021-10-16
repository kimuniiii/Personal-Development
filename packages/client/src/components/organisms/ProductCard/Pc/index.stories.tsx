import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { productCardListTestData } from 'src/components/organisms/ProductCard/testData';

import { PcProductCard } from '.';

export default {
  title: 'organisms/PcProductCard',
  component: PcProductCard,
} as Meta;

type Props = React.ComponentProps<typeof PcProductCard>;

const Template: Story<Props> = (args) => <PcProductCard {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  productCardList: productCardListTestData,
};
