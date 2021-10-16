import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { productCardListTestData } from 'src/components/organisms/ProductCard/testData';

import { SpProductCard } from '.';

export default {
  title: 'organisms/SpProductCard',
  component: SpProductCard,
} as Meta;

type Props = React.ComponentProps<typeof SpProductCard>;

const Template: Story<Props> = (args) => <SpProductCard {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  productCardList: productCardListTestData,
};
