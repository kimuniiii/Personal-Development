import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { SelectBox } from './index';

export default {
  component: SelectBox,
  title: 'atoms/SelectBox',
} as Meta;

type Props = React.ComponentProps<typeof SelectBox>;

const Template: Story<Props> = (args) => <SelectBox {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  labelText: 'カテゴリー',
  optionList: ['選択肢1', '選択肢2', '選択肢3'],
  subText: '',
  top: '18px',
  width: '300px',
};
