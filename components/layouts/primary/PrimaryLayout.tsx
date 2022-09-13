import Head from 'next/head';
import Footer from '../../navigations/footer/Footer';
import Header from '../../navigations/header/Header';
import Navbar from '../../navigations/navbar/Navbar';
import Sidebar from '../../navigations/sidebar/Sidebar';
import BreadCrumb from '../../utilities/breadcrumb/BreadCrumb';
import Cart from '../../utilities/cart/Cart';

export type TPrimaryLayout = {
  children: React.ReactNode;
};

const PrimaryLayout: React.FC<TPrimaryLayout> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Gin Shopping Website</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center">
        <Header />
        <Sidebar
          keySideBar="menuSideBar"
          contentSideBar={<Navbar className="mt-12" />}
        />
        <Sidebar
          keySideBar="cartSideBar"
          contentSideBar={<Cart className="mt-7" />}
          directionAnimate="right"
        />
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
