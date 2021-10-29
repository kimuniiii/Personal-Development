import { gql } from '@apollo/client';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';

import { Button } from 'src/components/atoms/Button';
import { SelectBox } from 'src/components/atoms/SelectBox';
import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';

import type { DocumentNode } from '@apollo/client';
import type { VFC } from 'react';
import type { SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

type UseSearchFormInputs = {
  select_category_box: string;
  select_display_order_box: string;
};

type SearchBoxProps = {
  isMobileUaDeviceType: boolean;
  setGetProductData: React.Dispatch<React.SetStateAction<DocumentNode>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchBox: VFC<SearchBoxProps> = ({
  isMobileUaDeviceType,
  setGetProductData,
  setSelectedCategory,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  /**
   * @概要 バリデーション成功時に呼び出されるイベントハンドラ
   * @説明 検索ボックスで選択した値に基づいて`query`を実行する
   */
  const handleOnSubmit: SubmitHandler<UseSearchFormInputs> = (data): void => {
    const orderByPrice = data.select_display_order_box === '金額の安い順' ? 'asc' : 'desc';

    const GET_FILTER_PRODUCT_DATA = gql`
      query GetFilterProductData {
        product(order_by: {price: ${orderByPrice} }, where: { category: { _eq: "${data.select_category_box}" }}) {
          id
          name
          price
          base64_image
        }
      }
    `;

    setSelectedCategory(data.select_category_box);
    setGetProductData(GET_FILTER_PRODUCT_DATA);
  };

  /**
   * @概要 バリデーション失敗時に呼び出されるイベントハンドラ
   */
  const handleOnError: SubmitErrorHandler<UseSearchFormInputs> = (errors) => {
    // eslint-disable-next-line no-console
    console.error(errors);
  };

  return (
    <StSearchForm
      isMobileUaDeviceType={isMobileUaDeviceType}
      onSubmit={handleSubmit(handleOnSubmit, handleOnError)}
    >
      <SelectBox
        id='select_category_box'
        name='select_category_box'
        labelText='カテゴリー'
        labelType='requiredMarker'
        optionList={['カテゴリーを選択してください', '家電', 'PC', 'ゲーム', '衣類', 'その他']}
        top='18px'
        width='300px'
        isError={!!errors['select_category_box']}
        errors={errors}
        register={register('select_category_box', {
          required: { message: 'カテゴリーをセットしてください', value: true },
        })}
      />
      <SelectBox
        id='select_display_order_box'
        name='select_display_order_box'
        labelText='表示順'
        labelType='requiredMarker'
        optionList={['表示順を選択してください', '金額の安い順', '金額の高い順']}
        top='18px'
        width='300px'
        isError={!!errors['select_display_order_box']}
        errors={errors}
        register={register('select_display_order_box', {
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
      />
    </StSearchForm>
  );
};

const StSearchForm = styled.form<{ isMobileUaDeviceType: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  width: 348px;
  height: ${({ isMobileUaDeviceType }): string => (isMobileUaDeviceType ? 'auto' : '500px')};
  background-color: ${COLOR_PALETTE.LIGHT_GRAY};
`;
