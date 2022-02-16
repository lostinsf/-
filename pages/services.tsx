import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Services from '@features/services';
import { BaseLayout } from '@layouts/index';

const ServicesPage: NextPage = () => (
  <BaseLayout>
    <Services />
  </BaseLayout>
);

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default ServicesPage;
