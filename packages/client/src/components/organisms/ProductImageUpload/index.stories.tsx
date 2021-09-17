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
  const [isFileTypeError, setIsFileTypeError] = useState(false);
  const [isNumberError, setIsNumberError] = useState(false);

  const onDeleteImgBtn = (photoIndex: number): void => {
    if (confirm('選択した画像を消してよろしいですか？')) {
      const modifyPhotos = photoFiles.concat();
      modifyPhotos.splice(photoIndex, 1);
      setPhotoFiles(modifyPhotos);
    }
  };

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // 型ガード（Nullチェック）
    if (event.target.files === null || event.target.files.length === 0) {
      return;
    }

    // 画像のみアップロードするようにするため
    // 画像以外のファイルだったらエラー文を表示する。処理を中断する。
    if (
      !['image/gif', 'image/jpeg', 'image/png', 'image/bmp', 'image/svg+xml'].includes(
        event.target.files[0].type,
      )
    ) {
      setIsFileTypeError(true);
      return;
    }

    // 商品登録ページのアップロードできる画像（＝プレビューの画像）の枚数は3枚までにするため
    // 3枚以上のファイルをアップロードしようとしたらエラー文を出す。処理を中断する。
    if (photoFiles.length >= 3) {
      setIsNumberError(true);
      return;
    }

    console.log('event.target.value', event.target.value);
    console.log('event.target.files', event.target.files);
    console.log('event.target.files[0]', event.target.files[0]);
    console.log('forward photoFiles', photoFiles);

    setPhotoFiles([...photoFiles, ...event.target.files]);

    console.log('after photoFiles', photoFiles);

    // onChangeは連続で同じファイルを選択すると発火しない問題の対応のため
    // 初期化することで同じファイルを連続で選択してもonChangeが発動するように設定する
    // こうすることで、画像をキャンセルしてすぐに同じ画像を選ぶ動作に対応できる
    event.target.value = '';
  };

  console.log('out event handler photoFiles', photoFiles);

  return (
    <ProductImageUpload
      photoFiles={photoFiles}
      isFileTypeError={isFileTypeError}
      isNumberError={isNumberError}
      onDeleteImgBtn={onDeleteImgBtn}
      onFileInputChange={onFileInputChange}
    />
  );
};

export const Basic = Template.bind({});
