import React from 'react';

import { CommonFooter } from '.';

import type { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: 'templates/CommonTemplate/CommonFooter',
  component: CommonFooter,
} as Meta;

type Props = React.ComponentProps<typeof CommonFooter>;

const Template: Story<Props> = (args) => <CommonFooter {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
