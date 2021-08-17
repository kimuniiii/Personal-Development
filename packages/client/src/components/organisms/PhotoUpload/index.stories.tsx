import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { PhotoUpload } from '.';

export default {
  title: 'organisms/PhotoUpload',
  component: PhotoUpload,
} as Meta;

type Props = React.ComponentProps<typeof PhotoUpload>;

const Template: Story<Props> = (args) => <PhotoUpload {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  text: 'サンプル',
};
