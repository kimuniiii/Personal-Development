import React from 'react';

import { Loader } from './index';

import type { Meta, Story } from '@storybook/react/types-6-0';

export default {
  component: Loader,
  title: 'atoms/Loader',
} as Meta;

type Props = React.ComponentProps<typeof Loader>;

const Template: Story<Props> = (args) => {
  return <Loader {...args} />;
};

export const Basic = Template.bind({});

Basic.args = {
  loadingContent: 'このまましばらくお待ち下さい',
};

/**
 * Loaderコンポーネントを画面中央に表示させる
 */
const CenterTemplate: Story<Props> = (args) => {
  return (
    <div
      style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center' }}
    >
      <Loader {...args} />
    </div>
  );
};

export const Center = CenterTemplate.bind({});

Center.args = {
  loadingContent: 'このまましばらくお待ち下さい',
};
