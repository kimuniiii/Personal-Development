import React, { useState } from 'react';

import { Button } from 'src/components/atoms/Button';
import { Margin } from 'src/components/layouts/Margin';

import { ProfileImageUpload } from '.';

import type { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: 'organisms/ProfileImageUpload',
  component: ProfileImageUpload,
} as Meta;

type Props = React.ComponentProps<typeof ProfileImageUpload>;

const Template: Story<Props> = (args) => {
  // プロフィール編集画像に関する「状態変数」と「更新関数」と「イベントハンドラ」
  const [selectedFile, setSelectedFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log('selectedFile', selectedFile);
  };

  const onFileSelect = (selectedFile: File): void => {
    setSelectedFile(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile));
  };

  const deleteProfileImg = (): void => {
    if (confirm('選択した画像を削除してもよろしいですか？')) {
      setImageUrl('');
    }
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
      <ProfileImageUpload
        {...args}
        imageUrl={imageUrl}
        onClick={deleteProfileImg}
        onFileSelect={onFileSelect}
      />
      <Margin bottom='16px' />
      <Button
        type='submit'
        buttonContent='送信ボタン'
        width='343px'
        styleTypes='primary'
        fontSizeValue='16px'
        onClick={(): void => alert('送信ボタンをクリック')}
      />
    </form>
  );
};

export const Basic = Template.bind({});

Basic.args = {
  labelText: 'プロフィール画像',
  name: 'profileImage',
};
