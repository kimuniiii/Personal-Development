import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useState } from 'react';

import { Button } from 'src/components/atoms/Button';

import { Dialog } from '.';

export default {
  component: Dialog,
  title: 'atoms/Dialog',
} as Meta;

type Props = React.ComponentProps<typeof Dialog>;

const Template: Story<Props> = (args) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onDialogOpen = (): void => setIsDialogOpen(true);
  const onDialogClose = (): void => setIsDialogOpen(false);

  return (
    <div>
      <Button
        type='button'
        styleTypes='secondary'
        width='200px'
        buttonContent='ダイアログを開く'
        fontSizeValue='14px'
        onClick={onDialogOpen}
      />
      <Dialog {...args} isDialogOpen={isDialogOpen} onDialogClose={onDialogClose} />
    </div>
  );
};

export const Basic = Template.bind({});

const DIALOG_TITLE =
  'ユーザー登録の時にメールアドレスとパスワード経由でログインした場合のみパスワードリセットメールは送信されます。メールアドレス宛にパスワードリセットメールを送信しますか？';

Basic.args = {
  dialogTitle: DIALOG_TITLE,
};
