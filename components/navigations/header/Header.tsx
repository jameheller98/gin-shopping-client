import { MenuIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import { useDrawerContext } from '../../../state/drawer/DrawerContext';
import Brand from '../../common/brand/Brand';
import Sidebar from '../sidebar/Sidebar';

export type THeader = {} & React.ComponentPropsWithoutRef<'header'>;

const Header: React.FC<THeader> = ({ className, ...headerProps }) => {
  const { onOpenDrawer } = useDrawerContext();

  return (
    <header {...headerProps} className={`grid grid-cols-3 ${className}`}>
      <Sidebar />
      <MenuIcon
        className="h-7 w-7 self-center cursor-pointer ml-4"
        onClick={() => onOpenDrawer(true)}
      />
      <div className="flex justify-center items-center">
        <Brand />
      </div>
      <ShoppingBagIcon className="h-7 w-7 self-center cursor-pointer justify-self-end mr-4" />
    </header>
  );
};

export default Header;
