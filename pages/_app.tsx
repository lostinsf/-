import { AnimatePresence } from 'framer-motion';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import { useEffect, useState, useCallback } from 'react';
import { RecoilRoot } from 'recoil';
import { CacheProvider, EmotionCache, Global, ThemeProvider } from '@emotion/react';
import config from '@lib/configs/seo.json';
import { defaultTheme, globalStyles } from '@lib/styles';
import { createEmotionCache } from '@utils/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingFullscreen from '@components/loadingFullscreen';

const DynamicCustomPointer = dynamic(() => import('@components/customPointer'), { ssr: false });

type MyAppProps = {
  emotionCache: EmotionCache;
} & AppProps;

interface IMyAppStates {
  isRouteChanging: boolean;
  loadingKey: number;
}

const initMyAppStates: IMyAppStates = {
  isRouteChanging: false,
  loadingKey: 0,
};

function MyApp(props: MyAppProps): JSX.Element {
  const { Component, emotionCache = createEmotionCache(), pageProps } = props;
  const router = useRouter();
  const [state, setState] = useState<IMyAppStates>(initMyAppStates);

  // 로딩 화면 등장 유무 임시 적용
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progressNum, setProgressNum] = useState<number>(0);

  const onProgressNumChange = useCallback((): void => {
    setProgressNum(progressNum + 2);
    if (progressNum >= 100) {
      setProgressNum(100);
    }
  }, [progressNum]);

  useEffect((): (() => void) | undefined => {
    if (progressNum < 100) {
      const id = setInterval(() => {
        onProgressNumChange();
      }, 100);
      return () => clearInterval(id);
    }

    if (progressNum === 100) {
      setIsLoading(false);
    }

    return undefined;
  }, [isLoading, progressNum]);

  useEffect(() => {
    const handleRouteChangeStart = (): void => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey + 1,
      }));
    };

    const handleRouteChangeEnd = (url: string): void => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }));
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    router.events.on('routeChangeError', handleRouteChangeEnd);
  }, [router.events]);

  return (
    <CacheProvider value={emotionCache}>
      <DefaultSeo {...config} />
      <NextHead>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
      </NextHead>
      <RecoilRoot>
        <Global styles={globalStyles} />
        <ThemeProvider theme={defaultTheme}>
          <LoadingFullscreen key="LoadingFullscreen1" isShow={isLoading} progressNum={progressNum} />
          <AnimatePresence exitBeforeEnter>
            <DynamicCustomPointer />
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </ThemeProvider>
      </RecoilRoot>
    </CacheProvider>
  );
}

export default appWithTranslation(MyApp);
