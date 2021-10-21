import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';

import { Button } from 'src/components/atoms/Button';
import { IconButton } from 'src/components/atoms/IconButton';

import { TransitionHorizontalModal } from '.';

import type { Meta, Story } from '@storybook/react/types-6-0';

export default {
  argTypes: {
    headerFontSize: {
      control: { type: 'radio' },
      options: ['12px', '14px', '16px', '18px', '20px', '24px', '32px'],
    },
  },
  component: TransitionHorizontalModal,
  title: 'organisms/TransitionHorizontalModal',
} as Meta;

type Props = React.ComponentProps<typeof TransitionHorizontalModal>;

const Template: Story<Props> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  const onModalOpen = (): void => setIsOpen(true);
  const onModalClose = (): void => setIsOpen(false);

  return (
    <div>
      <Button
        type='button'
        styleTypes='secondary'
        width='200px'
        buttonContent='モーダルを開く'
        fontSizeValue='14px'
        onClick={onModalOpen}
      />
      <TransitionHorizontalModal
        {...args}
        isModalOpen={isOpen}
        onModalClose={onModalClose}
        closeButtonComponent={
          <IconButton
            type='button'
            svgComponent={<ImCross />}
            onClick={onModalClose}
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
  mainContent: <p style={{ paddingLeft: '8px' }}>{'メインコンテンツ'}</p>,
  modalTitle: 'TransitionHorizontalModal',
  modalWidth: '100vw',
  headerFontSize: '24px',
  headerPadding: '8px',
};
