import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Home from '@features/home';
import { BaseLayout } from '@layouts/index';

// 메인 페이지 구성: base 레이아웃 / home 특징 추가
const HomePage: NextPage = () => (
  <BaseLayout>
    <Home />
  </BaseLayout>
);

// i18n 활용: 자동으로 최상단 url에 언어팩 설정을 지원해줌
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default HomePage;
