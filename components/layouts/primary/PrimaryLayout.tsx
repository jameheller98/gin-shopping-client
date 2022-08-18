import Head from 'next/head';
import Footer from '../../navigations/footer/Footer';
import Header from '../../navigations/header/Header';

export type TPrimaryLayout = { children: React.ReactNode };

const PrimaryLayout: React.FC<TPrimaryLayout> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Gin Shopping Website</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center">
        <Header />
        <main>{children}</main>
        <div className="m-auto" />
        <Footer />
      </div>
    </>
  );
};

export default PrimaryLayout;
