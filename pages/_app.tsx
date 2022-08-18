import type { AppProps } from 'next/app';
import { DrawerProvider } from '../state/drawer/DrawerContext';
import './globals.css';
import { NextPageWithLayout } from './page';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <DrawerProvider>{getLayout(<Component {...pageProps} />)}</DrawerProvider>
  );
}

export default MyApp;
