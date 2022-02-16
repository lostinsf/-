import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Home from '@features/home';
import { BaseLayout } from '@layouts/index';

const HomePage: NextPage = () => (
  <BaseLayout>
    <Home />
  </BaseLayout>
);

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default HomePage;
