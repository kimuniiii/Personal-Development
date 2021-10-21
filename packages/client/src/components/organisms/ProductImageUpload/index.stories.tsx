import React, { useState } from 'react';

import { Button } from 'src/components/atoms/Button';
import { Margin } from 'src/components/layouts/Margin';

import { ProductImageUpload } from '.';

import type { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: 'organisms/ProductImageUpload',
  component: ProductImageUpload,
} as Meta;

type Props = React.ComponentProps<typeof ProductImageUpload>;

const Template: Story<Props> = (args) => {
  // ProductImageUpload に関する状態管理と更新関数とイベントハンドラ
  const [selectedFiles, setPhotoFiles] = useState<File[]>([]);

  /**
   * @概要 送信ボタンを押した時に呼び出されるイベントハンドラ
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('selectedFiles', selectedFiles);
    console.log({ profileImage: selectedFiles });
  };

  /**
   * @概要 子供から親に送られたファイル情報を更新する関数
   */
  const onFileSelect = (selectedFiles: File[]): void => {
    setPhotoFiles(selectedFiles);
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
      <ProductImageUpload {...args} selectedFiles={selectedFiles} onFileSelect={onFileSelect} />
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
  labelText: '商品画像',
};
