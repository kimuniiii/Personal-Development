import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { CommonHeader } from '.';

export default {
  title: 'templates/CommonTemplate/CommonHeader',
  component: CommonHeader,
} as Meta;

type Props = React.ComponentProps<typeof CommonHeader>;

const Template: Story<Props> = (args) => <CommonHeader {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
