import React from 'react';

import { CommonSideBar } from '.';

import type { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: 'templates/CommonTemplate/CommonSideBar',
  component: CommonSideBar,
} as Meta;

type Props = React.ComponentProps<typeof CommonSideBar>;

const Template: Story<Props> = (args) => <CommonSideBar {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
