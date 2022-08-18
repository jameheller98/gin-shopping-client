import { XIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { useDrawerContext } from '../../../state/drawer/DrawerContext';
import Navbar from '../navbar/Navbar';

export type TSidebar = {} & React.ComponentPropsWithoutRef<'div'>;

const Sidebar: React.FC<TSidebar> = ({ className, ...divProps }) => {
  const { openDrawer, onOpenDrawer } = useDrawerContext();

  const handleTransitionDrawerClass = (positionDrawer: 'left' | 'right') =>
    classNames({
      [`${
        positionDrawer === 'right' && 'delay-[150ms] '
      }-translate-x-0 opacity-100`]: openDrawer,
      [`${
        positionDrawer === 'left'
          ? '-translate-x-[133.33%] delay-[150ms]'
          : '-translate-x-[400%]'
      } opacity-0`]: !openDrawer,
    });

  return (
    <>
      <div
        {...divProps}
        className={`w-9/12 h-full p-4 absolute bg-white z-10 transition duration-300 ${handleTransitionDrawerClass(
          'left'
        )} ${className}`}
      >
        <XIcon
          className="w-7 h-7 float-right cursor-pointer"
          onClick={() => onOpenDrawer(false)}
        />
        <Navbar className="mt-12" />
      </div>
      <div
        className={`w-3/12 h-full absolute right-0 bg-black bg-opacity-40 transition duration-300 ${handleTransitionDrawerClass(
          'right'
        )}`}
      />
    </>
  );
};

export default Sidebar;
