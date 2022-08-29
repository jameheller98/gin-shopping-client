import Head from 'next/head';
import Footer from '../../navigations/footer/Footer';
import Header from '../../navigations/header/Header';
import Sidebar from '../../navigations/sidebar/Sidebar';

export type TPrimaryLayout = { children: React.ReactNode };

const PrimaryLayout: React.FC<TPrimaryLayout> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Gin Shopping Website</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center">
        <Header />
        <Sidebar />
        <main className="my-20">{children}</main>
        <div className="m-auto" />
        <Footer />
      </div>
    </>
  );
};

export default PrimaryLayout;
