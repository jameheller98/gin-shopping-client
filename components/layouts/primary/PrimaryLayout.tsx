import Head from 'next/head';
import { useEffect } from 'react';
import Footer from '../../navigations/footer/Footer';
import Header from '../../navigations/header/Header';
import Sidebar from '../../navigations/sidebar/Sidebar';
import BreadCrumb from '../../utilities/breadcrumb/BreadCrumb';

export type TPrimaryLayout = {
  children: React.ReactNode;
};

const PrimaryLayout: React.FC<TPrimaryLayout> = ({ children }) => {
  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    const documentMain = document.querySelector<HTMLElement>('main');

    if (documentMain)
      documentMain.style.width = `calc(100vw - ${scrollbarWidth}px)`;
  }, []);

  return (
    <>
      <Head>
        <title>Gin Shopping Website</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center">
        <Header />
        <Sidebar />
        <main className="my-20">
          <BreadCrumb />
          {children}
        </main>
        <div className="m-auto" />
        <Footer />
      </div>
    </>
  );
};

export default PrimaryLayout;
