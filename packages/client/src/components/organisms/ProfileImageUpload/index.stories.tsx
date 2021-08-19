import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { ProfileImageUpload } from '.';

export default {
  title: 'organisms/ProfileImageUpload',
  component: ProfileImageUpload,
} as Meta;

type Props = React.ComponentProps<typeof ProfileImageUpload>;

const Template: Story<Props> = (args) => <ProfileImageUpload {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
