import { Story, Meta } from '@storybook/react/types-6-0';
import React, { useState } from 'react';

import { ProfileImageUpload } from '.';

export default {
  title: 'organisms/ProfileImageUpload',
  component: ProfileImageUpload,
} as Meta;

type Props = React.ComponentProps<typeof ProfileImageUpload>;

const Template: Story<Props> = (args) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files === null || event.target.files.length === 0) {
      return;
    }

    console.log(event.target.files[0]);

    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setImageUrl(imageUrl);
    // onChangeは連続で同じファイルを選択すると発火しない問題の対応のため
    // 初期化することで同じファイルを連続で選択してもonChangeが発動するように設定する
    // こうすることで、画像をキャンセルしてすぐに同じ画像を選ぶ動作に対応できる
    event.target.value = '';
  };

  const deleteProfileImg = (): void => {
    if (confirm('選択した画像を削除してもよろしいですか？')) {
      setImageUrl('');
    }
  };

  return (
    <ProfileImageUpload
      {...args}
      imageUrl={imageUrl}
      onClick={deleteProfileImg}
      onChange={onFileInputChange}
    />
  );
};

export const Basic = Template.bind({});

Basic.args = {};
