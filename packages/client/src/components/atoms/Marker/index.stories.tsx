import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';

import { COLOR_PALETTE } from 'src/styles/color_palette';

import { Marker } from '.';

export default {
  title: 'atoms/Marker',
  component: Marker,
} as Meta;

type Props = React.ComponentProps<typeof Marker>;

const Template: Story<Props> = (args) => <Marker {...args} />;

export const Required = Template.bind({});

Required.args = {
  text: '必須',
  color: COLOR_PALETTE.WHITE,
  bgColor: COLOR_PALETTE.ERROR_COLOR,
  border: 'none',
};

export const Optional = Template.bind({});

Optional.args = {
  text: '任意',
  color: COLOR_PALETTE.DARK_GRAY,
  bgColor: COLOR_PALETTE.WHITE,
  border: `1px solid ${COLOR_PALETTE.DARK_GRAY}`,
};
