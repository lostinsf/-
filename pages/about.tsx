import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import About from '@features/about';
import { BaseLayout } from '@layouts/index';

const AboutPage: NextPage = () => (
  <BaseLayout>
    <About />
  </BaseLayout>
);

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default AboutPage;
