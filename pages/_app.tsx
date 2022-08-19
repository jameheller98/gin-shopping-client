import type { AppProps } from 'next/app';
import { DrawerProvider } from '../state/drawer/DrawerContext';
import { MenuProvider } from '../state/menu/MenuContext';
import './globals.css';
import { NextPageWithLayout } from './page';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <DrawerProvider>
      <MenuProvider>{getLayout(<Component {...pageProps} />)}</MenuProvider>
    </DrawerProvider>
  );
}

export default MyApp;
