import { gql, useQuery } from '@apollo/client';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';
// eslint-disable-next-line import/order
import Parser from 'ua-parser-js';

import { Loader } from 'src/components/atoms/Loader';
import { Margin } from 'src/components/layouts/Margin';
import { PcProductCard } from 'src/components/organisms/ProductCard/Pc';
import { SpProductCard } from 'src/components/organisms/ProductCard/Sp';
import { PcProductCardSkeleton } from 'src/components/organisms/ProductCardSkeleton/Pc';
import { SpProductCardSkeleton } from 'src/components/organisms/ProductCardSkeleton/Sp';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';
import { ErrorTemplate } from 'src/components/templates/ErrorTemplate';
import { HeadTemplate } from 'src/components/templates/HeadTemplate';

import { useAuth0Api } from 'src/hooks/useAuth0Api';

import { formatDateToyyyyMMdd } from 'src/lib/date';

import { COLOR_PALETTE } from 'src/styles/color_palette';

import type { NextPage, GetServerSideProps } from 'next';

import NoImage from '../../../public/images/no_image.png';

type MyPageProps = {
  isMobileUaDeviceType: boolean;
  origin: string;
  auth0Domain?: string;
  auth0ClientId?: string;
};

/**
 * @概要 ログインしていたらマイページ・ログインしていなかったらログイン画面に遷移するコンポーネント
 * @説明 非ログイン時にアクセスできないようにしたいため「Protected Page」である
 */
const MyPage: NextPage<MyPageProps> = ({
  isMobileUaDeviceType,
  origin,
  auth0Domain,
  auth0ClientId,
}) => {
  const { isLoading, error } = useAuth0Api(`${origin}/my-page`, {
    audience: `${origin}`,
  });
  const { user } = useAuth0();

  // ログインユーザーが実際に登録した商品情報だけを取得する
  const GET_USER_REGISTER_PRODUCT_DATA = gql`
    query GetUserRegisterProductData {
      product(offset: 0, limit: 6, order_by: { id: asc }, where: { user_id: { _eq: "${user?.sub}" }}) {
        id
        name
        price
        category
        base64_image
      }
    }
  `;

  // 商品登録が完了したらマイページに画面遷移して、商品が登録されていることを示したい
  // なので「cache」を用いないで、常に最新のDBの情報を取得するようにしている
  const { loading, data } = useQuery<{
    product: [{ id: number; name: string; price: number; base64_image: string }];
  }>(GET_USER_REGISTER_PRODUCT_DATA, { fetchPolicy: 'no-cache' });

  if (isLoading) {
    return (
      <StCenterLoaderContainer>
        <Loader loadingContent='マイページに画面遷移しています' />
      </StCenterLoaderContainer>
    );
  }

  if (error) {
    return <ErrorTemplate error={error} />;
  }

  if (typeof user === 'undefined') {
    return null;
  }

  return (
    <React.Fragment>
      <HeadTemplate
        pageOrigin={origin}
        pageCanonicalUrl='https://www.riot-ec-site.com/my-page'
        pageTitle='マイページ'
      />
      {isMobileUaDeviceType ? (
        <CommonTemplate
          isSideBar={false}
          isMobileUaDeviceType={isMobileUaDeviceType}
          auth0Domain={auth0Domain}
          auth0ClientId={auth0ClientId}
        >
          <StSpRoot>
            <StProductListContainer>
              <h3>ユーザー情報</h3>
              <StProfileInfoContainer>
                {user.picture ? (
                  <img src={user.picture} alt='user picture' width={126} height={126} />
                ) : (
                  <Image src={NoImage} alt='Mo Image' width={126} height={126} />
                )}
                <Margin right='32px' />
                <StUserProfileContainer>
                  {/* TODO : Hasura から query で 最新の情報を取得する */}
                  <h3>{user.nickname}</h3>
                  <Margin bottom='8px' />
                  <h5>Email : {user.email}</h5>
                  <Margin bottom='8px' />
                  <h5>登録名 : {user.nickname}</h5>
                  <Margin bottom='8px' />
                  <h5>最終更新日 : {formatDateToyyyyMMdd(new Date(`${user.updated_at}`))}</h5>
                </StUserProfileContainer>
              </StProfileInfoContainer>
              <h3>登録商品</h3>
              <StComplete>MEMO : 自分が登録した商品情報だけが描画</StComplete>
              {loading && !data ? <SpProductCardSkeleton /> : null}
              {!loading && data ? <SpProductCard productCardList={data?.product} /> : null}
              <h3>連絡掲示板</h3>
              <StTodo>TODO : 要件が決まり次第、実装を行う</StTodo>
              <h3>お気に入り一覧</h3>
              <StTodo>TODO : 要件が決まり次第、実装を行う</StTodo>
            </StProductListContainer>
          </StSpRoot>
        </CommonTemplate>
      ) : (
        <CommonTemplate isSideBar={true} auth0Domain={auth0Domain} auth0ClientId={auth0ClientId}>
          <StPcRoot>
            <StProductListContainer>
              <h3>ユーザー情報</h3>
              <StProfileInfoContainer>
                {user.picture ? (
                  <img src={user.picture} alt='user picture' width={126} height={126} />
                ) : (
                  <Image src={NoImage} alt='Mo Image' width={126} height={126} />
                )}
                <Margin right='32px' />
                <StUserProfileContainer>
                  <h3>{user.nickname}</h3>
                  <Margin bottom='8px' />
                  <h5>Email : {user.email}</h5>
                  <Margin bottom='8px' />
                  <h5>登録名 : {user.nickname}</h5>
                  <Margin bottom='8px' />
                  <h5>最終更新日 : {formatDateToyyyyMMdd(new Date(`${user.updated_at}`))}</h5>
                </StUserProfileContainer>
              </StProfileInfoContainer>
              <h3>登録商品</h3>
              <StComplete>MEMO : 自分が登録した商品情報だけが描画</StComplete>
              {loading && !data ? <PcProductCardSkeleton /> : null}
              {!loading && data ? <PcProductCard productCardList={data?.product} /> : null}
              <h3>連絡掲示板</h3>
              <StTodo>TODO : 要件が決まり次第、実装を行う</StTodo>
              <h3>お気に入り一覧</h3>
              <StTodo>TODO : 要件が決まり次第、実装を行う</StTodo>
            </StProductListContainer>
          </StPcRoot>
        </CommonTemplate>
      )}
    </React.Fragment>
  );
};

export default withAuthenticationRequired(MyPage, {
  // eslint-disable-next-line react/display-name
  onRedirecting: () => {
    return (
      <StCenterLoaderContainer>
        <Loader loadingContent='ログイン済みかどうか判定しています' />
      </StCenterLoaderContainer>
    );
  },
});

// TODO : UserAgentの判別によってレスポンシブ対応を行っているが、SSGは非対応。SSGにも対応できる方法があったら置き換える
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const userAgent = Parser(req?.headers['user-agent']);

  return { props: { isMobileUaDeviceType: userAgent.device.type === 'mobile' } };
};

const StCenterLoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StSpRoot = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  /*
  ** CommonHeaderのheight : 48px
  ** CommonFooterのheight : 56px
  */
  min-height: calc(100vh - (48px + 56px));
  gap: 24px;
`;

const StPcRoot = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 48px;
  /*
  ** CommonHeaderのheight : 48px
  ** CommonFooterのheight : 56px
  */
  min-height: calc(100vh - (48px + 56px));
  gap: 24px;
`;

const StProductListContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StProfileInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StUserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StComplete = styled.p`
  /* max-content値は内因性の優先幅 | コンテンツの幅に等しくなる */
  width: max-content;
  color: ${COLOR_PALETTE.BLACK};
  background-color: ${COLOR_PALETTE.SNACKBAR_SUCCESS_COLOR};
`;

const StTodo = styled.p`
  color: ${COLOR_PALETTE.SUB_COLOR};
`;
