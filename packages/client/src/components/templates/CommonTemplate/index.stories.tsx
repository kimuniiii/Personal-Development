import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { CommonTemplate } from '.';

export default {
  title: 'templates/CommonTemplate',
  component: CommonTemplate,
} as Meta;

type Props = React.ComponentProps<typeof CommonTemplate>;

const Template: Story<Props> = (args) => <CommonTemplate {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'CommonTemplate',
  isSideBar: false,
};
