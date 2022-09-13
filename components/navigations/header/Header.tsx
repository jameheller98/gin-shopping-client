import { MenuIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { memo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartTotalState } from '../../../state/cart/cartSelectors';
import { openDrawerState } from '../../../state/drawer/drawerAtoms';
import Brand from '../../common/brand/Brand';

export type THeader = {} & React.ComponentPropsWithoutRef<'header'>;

// eslint-disable-next-line react/display-name
const Header: React.FC<THeader> = memo(({ className, ...headerProps }) => {
  const setOpenDrawerMenu = useSetRecoilState(openDrawerState('menuSideBar'));
  const setOpenDrawerCart = useSetRecoilState(openDrawerState('cartSideBar'));
  const cartTotal = useRecoilValue(cartTotalState);

  return (
    <header
      {...headerProps}
      className={`fixed top-0 z-[3] bg-white grid grid-cols-3 py-1 ${className}`}
    >
      <div
        className="self-center justify-self-start cursor-pointer ml-4 p-1"
        onClick={() => setOpenDrawerMenu(true)}
      >
        <MenuIcon className="h-7 w-7" />
      </div>
      <Link href="/">
        <a className="flex justify-center items-center">
          <Brand />
        </a>
      </Link>
      <div
        className="relative self-center justify-self-end mr-4 cursor-pointer p-1"
        onClick={() => setOpenDrawerCart(true)}
      >
        {cartTotal > 0 && (
          <span className="absolute w-5 h-5 z-[1] flex items-center justify-center font-semibold text-sm text-slate-50 -right-[6px] -top-[6px] before:absolute before:content before:w-4 before:h-4 before:rounded-full before:bg-slate-600 before:z-[-1] before:animate-ping before:left-[2px] before:top-[2px] after:absolute after:content after:w-full after:h-full after:left-0 after:rounded-full after:bg-slate-600 after:z-[-1]">
            {cartTotal}
          </span>
        )}
        <ShoppingBagIcon className="h-7 w-7" />
      </div>
    </header>
  );
});

export default Header;
