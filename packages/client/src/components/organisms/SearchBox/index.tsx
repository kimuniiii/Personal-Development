import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';

import type { VFC } from 'react';

import { Button } from 'src/components/atoms/Button';
import { SelectBox } from 'src/components/atoms/SelectBox';
import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';

export const SearchBox: VFC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  /**
   * 検索ボタンを押した時に呼び出されるイベントハンドラ
   */
  const onSubmit = (data: Record<string, unknown>): void => {
    console.log(data);
  };

  return (
    <StSearchForm onSubmit={handleSubmit(onSubmit)}>
      <SelectBox
        id='select-category-box'
        name='select-category-box'
        labelText='カテゴリー'
        optionList={['カテゴリーを選択してください', '家電', 'PC', 'ゲーム', '衣類', 'その他']}
        top='18px'
        width='300px'
        isError={!!errors['select-category-box']}
        errors={errors}
        register={register('select-category-box', {
          required: { message: 'カテゴリーをセットしてください', value: true },
        })}
      />
      <SelectBox
        id='select-display-order-box'
        name='select-display-order-box'
        labelText='表示順'
        optionList={['表示順を選択してください', '金額の安い順', '金額の高い順']}
        top='18px'
        width='300px'
        isError={!!errors['select-display-order-box']}
        errors={errors}
        register={register('select-display-order-box', {
          required: { message: '表示順をセットしてください', value: true },
        })}
      />
      <Margin bottom='16px' />
      <Button
        type='submit'
        styleTypes='primary'
        width='300px'
        fontSizeValue='16px'
        buttonContent='検索する'
        disabled={!isDirty}
        onClick={(): void => alert('検索するボタンをクリック')}
      />
    </StSearchForm>
  );
};

const StSearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  width: 348px;
  height: 500px;
  background-color: ${COLOR_PALETTE.LIGHT_GRAY};
`;
