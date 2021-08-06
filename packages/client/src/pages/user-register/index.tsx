import { HeadTemplate } from 'src/components/templates/HeadTemplate';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';

/**
 * @概要 ユーザー登録ボタンを押したら表示されるページコンポーネント
 */
const UserRegisterPage = (): JSX.Element => {
  return (
    <>
      <HeadTemplate pageTitle='ユーザー登録ページ' />
      <CommonTemplate>User Register Page</CommonTemplate>
    </>
  );
};

export default UserRegisterPage;
