import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { ProductImageUpload } from '.';

export default {
  title: 'organisms/ProductImageUpload',
  component: ProductImageUpload,
} as Meta;

type Props = React.ComponentProps<typeof ProductImageUpload>;

const Template: Story<Props> = (args) => <ProductImageUpload {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
