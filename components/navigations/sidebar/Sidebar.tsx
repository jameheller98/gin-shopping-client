import { XIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { useRecoilState } from 'recoil';
import { openDrawerState } from '../../../state/drawer/drawerAtoms';
import Navbar from '../navbar/Navbar';

export type TSidebar = {} & React.ComponentPropsWithoutRef<'div'>;

const Sidebar: React.FC<TSidebar> = ({ className, ...divProps }) => {
  const [openDrawer, setOpenDrawer] = useRecoilState(openDrawerState);

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
        className={`w-9/12 h-screen p-4 fixed top-0 left-0 z-[4] bg-white transition duration-300 overflow-auto ${handleTransitionDrawerClass(
          'left'
        )} ${className}`}
      >
        <XIcon
          className="w-7 h-7 float-right cursor-pointer"
          onClick={() => setOpenDrawer(false)}
        />
        <Navbar className="mt-12" />
      </div>
      <div
        className={`w-3/12 h-screen fixed top-0 right-0 z-[3] bg-black bg-opacity-40 transition duration-300 ${handleTransitionDrawerClass(
          'right'
        )}`}
      />
    </>
  );
};

export default Sidebar;
