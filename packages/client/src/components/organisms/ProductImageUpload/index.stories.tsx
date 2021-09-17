import { Story, Meta } from '@storybook/react/types-6-0';
import React, { useState } from 'react';

import { ProductImageUpload } from '.';

export default {
  title: 'organisms/ProductImageUpload',
  component: ProductImageUpload,
} as Meta;

type Props = React.ComponentProps<typeof ProductImageUpload>;

const Template: Story<Props> = () => {
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  const onDeleteImgBtn = (photoIndex: number): void => {
    if (confirm('選択した画像を消してよろしいですか？')) {
      const modifyPhotos = photoFiles.concat();
      modifyPhotos.splice(photoIndex, 1);
      setPhotoFiles(modifyPhotos);
    }
  };

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files === null || event.target.files.length === 0) {
      return;
    }
    setPhotoFiles([...photoFiles, ...event.target.files]);
    // onChangeは連続で同じファイルを選択すると発火しない問題の対応のため
    // 初期化することで同じファイルを連続で選択してもonChangeが発動するように設定する
    // こうすることで、画像をキャンセルしてすぐに同じ画像を選ぶ動作に対応できる
    event.target.value = '';
  };

  return (
    <ProductImageUpload
      photoFiles={photoFiles}
      onDeleteImgBtn={onDeleteImgBtn}
      onFileInputChange={onFileInputChange}
    />
  );
};

export const Basic = Template.bind({});
