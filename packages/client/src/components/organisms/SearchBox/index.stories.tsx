import React from 'react';

import { SearchBox } from '.';

import type { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: 'organisms/SearchBox',
  component: SearchBox,
} as Meta;

type Props = React.ComponentProps<typeof SearchBox>;

const Template: Story<Props> = (args) => <SearchBox {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
