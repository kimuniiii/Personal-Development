import { DocumentNode, gql } from '@apollo/client';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';

import type { VFC } from 'react';
import type { SubmitHandler, SubmitErrorHandler } from 'react-hook-form';

import { Button } from 'src/components/atoms/Button';
import { SelectBox } from 'src/components/atoms/SelectBox';
import { Margin } from 'src/components/layouts/Margin';

import { COLOR_PALETTE } from 'src/styles/color_palette';

type UseSearchFormInputs = {
  select_category_box: string;
  select_display_order_box: string;
};

type SearchBoxProps = {
  setGetProductData: React.Dispatch<React.SetStateAction<DocumentNode>>;
};

export const SearchBox: VFC<SearchBoxProps> = ({ setGetProductData }) => {
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
   */
  const handleOnSubmit: SubmitHandler<UseSearchFormInputs> = (data): void => {
    const orderByPrice = data.select_display_order_box === '金額の安い順' ? 'asc' : 'desc';

    const GET_FILTER_PRODUCT_DATA = gql`
      query GetFilterProductData {
        product(limit: 6, order_by: {price: ${orderByPrice} }, where: { category: { _eq: "${data.select_category_box}" }}) {
          id
          name
          price
        }
      }
    `;

    setGetProductData(GET_FILTER_PRODUCT_DATA);
  };

  /**
   * @概要 バリデーション失敗時に呼び出されるイベントハンドラ
   */
  const handleOnError: SubmitErrorHandler<UseSearchFormInputs> = (errors) => {
    console.error(errors);
  };

  /**
   * @概要 検索ボタン押下時に呼び出されるイベントハンドラ
   */
  const handleSearchBtnClick = (): void => {
    alert('検索するボタンをクリックしました');
  };

  return (
    <StSearchForm onSubmit={handleSubmit(handleOnSubmit, handleOnError)}>
      <SelectBox
        id='select_category_box'
        name='select_category_box'
        labelText='カテゴリー'
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
        onClick={handleSearchBtnClick}
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
