import { MenuIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import { useSetRecoilState } from 'recoil';
import { openDrawerState } from '../../../state/drawer/drawerAtoms';
import Brand from '../../common/brand/Brand';

export type THeader = {} & React.ComponentPropsWithoutRef<'header'>;

const Header: React.FC<THeader> = ({ className, ...headerProps }) => {
  const setOpenDrawer = useSetRecoilState(openDrawerState);

  return (
    <header
      {...headerProps}
      className={`fixed top-0 z-[1] bg-white grid grid-cols-3 py-1 ${className}`}
    >
      <MenuIcon
        className="h-7 w-7 self-center cursor-pointer ml-4"
        onClick={() => setOpenDrawer(true)}
      />
      <div className="flex justify-center items-center">
        <Brand />
      </div>
      <ShoppingBagIcon className="h-7 w-7 self-center cursor-pointer justify-self-end mr-4" />
    </header>
  );
};

export default Header;