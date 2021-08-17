import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { CommonFooter } from '.';

export default {
  title: 'templates/CommonTemplate/CommonFooter',
  component: CommonFooter,
} as Meta;

type Props = React.ComponentProps<typeof CommonFooter>;

const Template: Story<Props> = (args) => <CommonFooter {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
