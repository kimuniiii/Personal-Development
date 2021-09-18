import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { FormLabel } from '.';

export default {
  title: 'atoms/FormLabel',
  component: FormLabel,
} as Meta;

type Props = React.ComponentProps<typeof FormLabel>;

const Template: Story<Props> = (args) => <FormLabel {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  labelType: 'requiredMarker',
  labelText: 'プロフィール画像',
};
