import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Home from '@features/home';
import { BaseLayout } from '@layouts/index';
import { getI18nPaths } from '../../getI18nPaths';
import i18nextConfig from '../../next-i18next.config';

const HomePage: NextPage = () => (
  <BaseLayout>
    <Home />
  </BaseLayout>
);

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

export const getStaticProps = async (ctx: any) => ({
  props: {
    ...(await serverSideTranslations(ctx?.params?.locale, ['common'], i18nextConfig)),
  },
});

export default HomePage;
