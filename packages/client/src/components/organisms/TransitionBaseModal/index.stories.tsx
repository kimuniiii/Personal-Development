import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { ImCross } from 'react-icons/im';

import { IconButton } from 'src/components/atoms/IconButton';

import { TransitionBaseModal } from '.';

export default {
  argTypes: {
    headerFontSize: {
      control: { type: 'select' },
      options: ['12px', '14px', '16px', '18px', '20px', '24px', '32px'],
    },
  },
  component: TransitionBaseModal,
  title: 'organisms/TransitionBaseModal',
} as Meta;

type Props = React.ComponentProps<typeof TransitionBaseModal>;

const Template: Story<Props> = (args) => {
  return (
    <div>
      <TransitionBaseModal
        {...args}
        closeButtonComponent={
          <IconButton
            type='button'
            svgComponent={<ImCross />}
            onClick={action('Modal Close Btn Clicked')}
            borderRadius='50%'
            width='40px'
            height='40px'
          />
        }
      />
    </div>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  headerFontSize: '24px',
  headerPadding: '8px',
  mainContent: <p style={{ paddingLeft: '8px' }}>{'メインコンテンツ'}</p>,
  modalTitle: 'モーダルタイトル',
};
