import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import About from '@features/about';
import { BaseLayout } from '@layouts/index';

// about 페이지 구성: base 레이아웃 / about 특징 추가
const AboutPage: NextPage = () => (
  <BaseLayout>
    <About />
  </BaseLayout>
);

// i18n 활용: 자동으로 최상단 url에 언어팩 설정을 지원해줌
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default AboutPage;
