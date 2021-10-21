import React from 'react';

import { SelectBox } from './index';

import type { Meta, Story } from '@storybook/react/types-6-0';

export default {
  component: SelectBox,
  title: 'atoms/SelectBox',
} as Meta;

type Props = React.ComponentProps<typeof SelectBox>;

const Template: Story<Props> = (args) => <SelectBox {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  labelText: 'カテゴリー',
  labelType: 'requiredMarker',
  optionList: ['選択肢1', '選択肢2', '選択肢3'],
  top: '18px',
  width: '300px',
};
