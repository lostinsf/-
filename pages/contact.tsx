import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Contact from '@features/contact';
import { BaseLayout } from '@layouts/index';

const ContactPage: NextPage = () => (
  <BaseLayout>
    <Contact />
  </BaseLayout>
);

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default ContactPage;
