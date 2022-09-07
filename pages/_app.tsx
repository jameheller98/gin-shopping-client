import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import './globals.css';
import { NextPageWithLayout } from './page';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    const documentMain = document.querySelector('main');

    if (documentMain)
      documentMain.style.width = `calc(100vw - ${scrollbarWidth}px)`;
  }, []);

  return <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>;
}

export default MyApp;
