import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { SideBar } from '.';

export default {
  title: 'organisms/SideBar',
  component: SideBar,
} as Meta;

type Props = React.ComponentProps<typeof SideBar>;

const Template: Story<Props> = (args) => <SideBar {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
