import { HeadTemplate } from 'src/components/templates/HeadTemplate';
import { CommonTemplate } from 'src/components/templates/CommonTemplate';

const TopPage = (): JSX.Element => {
  return (
    <>
      <HeadTemplate pageTitle='トップページ' />
      <CommonTemplate>TopPage</CommonTemplate>
    </>
  );
};

export default TopPage;
