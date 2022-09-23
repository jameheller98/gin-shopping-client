import { XMarkIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRecoilState } from 'recoil';
import { openDrawerState } from '../../../state/drawer/drawerAtoms';
import useWindowSize from '../../../state/hooks/useWindowSize';
import Footer from '../../navigations/footer/Footer';
import Sidebar from '../../navigations/sidebar/Sidebar';
import BreadCrumb from '../../utilities/breadcrumb/BreadCrumb';

const Header = dynamic(() => import('../../navigations/header/Header'), {
  ssr: false,
});

const Cart = dynamic(() => import('../../utilities/cart/Cart'), {
  ssr: false,
});

const Navbar = dynamic(() => import('../../navigations/navbar/Navbar'), {
  ssr: false,
});

export type TPrimaryLayout = {
  children: React.ReactNode;
};

const PrimaryLayout: React.FC<TPrimaryLayout> = ({ children }) => {
  const { width } = useWindowSize();
  const [openDrawer, setOpenDrawer] = useRecoilState(
    openDrawerState('cartSideBar')
  );

  return (
    <>
      <Head>
        <title>Gin Shopping Website</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center">
        <Header />
        {width < 1200 && (
          <Sidebar
            keySideBar="menuSideBar"
            contentSideBar={<Navbar className="mt-12" />}
          />
        )}
        {width < 768 && (
          <Sidebar
            keySideBar="cartSideBar"
            contentSideBar={<Cart className="mt-7 " />}
            directionAnimate="right"
          />
        )}
        {width >= 768 && openDrawer && (
          <div className="absolute bg-white z-[3] right-5 top-20 w-[400px] shadow-[0_0_0_4px] shadow-slate-400 rounded-md p-5">
            <XMarkIcon
              className={`w-7 h-7 cursor-pointer float-left`}
              onClick={() => setOpenDrawer(false)}
            />
            <Cart className="mt-7" />
          </div>
        )}
        <main className="my-20 w-full lg:mt-[90px] sm:mt-[110px]">
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
