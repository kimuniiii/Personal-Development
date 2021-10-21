import { action } from '@storybook/addon-actions';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io/index';

import { COLOR_PALETTE } from 'src/styles/color_palette';

import { IconButton } from '.';

import type { Meta, Story } from '@storybook/react/types-6-0';

export default {
  components: IconButton,
  title: 'atoms/IconButton',
} as Meta;

type Props = React.ComponentProps<typeof IconButton>;

const Template: Story<Props> = (args) => {
  return <IconButton {...args} />;
};

export const Basic = Template.bind({});

Basic.args = {
  backgroundColor: `${COLOR_PALETTE.WHITE}`,
  border: `1px solid ${COLOR_PALETTE.LIGHT_GRAY}`,
  borderRadius: '50%',
  disabled: false,
  onClick: action('IconBtn Clicked'),
  padding: '8px',
  svgComponent: <IoIosArrowForward size={16} />,
};
