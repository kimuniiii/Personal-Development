import { HeadTemplate } from 'src/components/templates/HeadTemplate';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';

/**
 * @概要 ログインボタンを押したら表示されるページコンポーネント
 */
const LoginPage = (): JSX.Element => {
  return (
    <>
      <HeadTemplate pageTitle='ログインページ' />
      <CommonTemplate>LoginPage</CommonTemplate>
    </>
  );
};

export default LoginPage;
